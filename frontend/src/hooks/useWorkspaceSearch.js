import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { WorkspaceContext } from "../Context/WorkspaceContext/WorkspaceContext.jsx";
import { ChannelContext } from "../Context/ChannelContext/ChannelContext.jsx";
import { MembersContext } from "../Context/MembersContext/MembersContext.jsx";
import { UserContext } from "../Context/UserContext/UserContext.jsx";
import { searchInWorkspaceService } from "../services/workspaceService.js";
import { capitalizeFirstLetter } from "./useCapitalize.js";

const DEBOUNCE_MS = 280;

export function useWorkspaceSearch({ isOpen, openDropdown, closeDropdown }) {
    const { workspace_id } = useParams();
    const navigate = useNavigate();

    const workspaceCtx = useContext(WorkspaceContext);
    const channelCtx = useContext(ChannelContext);
    const membersCtx = useContext(MembersContext);
    const userCtx = useContext(UserContext);

    const activeWorkspaceId = workspace_id || workspaceCtx?.currentWorkspace_id;
    const currentChannelList = channelCtx?.currentChannelList;
    const currentWorkspaceMembers = membersCtx?.currentWorkspaceMembers;
    const userToken = userCtx?.userToken;
    const currentUserId = userCtx?.userData?.id || userCtx?.userData?._id;

    const [query, setQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [remoteResults, setRemoteResults] = useState({
        channels: [],
        members: [],
        channelMessages: [],
        directMessages: []
    });
    const [isSearchingMessages, setIsSearchingMessages] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const inputRef = useRef(null);
    const [prevWorkspaceId, setPrevWorkspaceId] = useState(activeWorkspaceId);

    if (prevWorkspaceId !== activeWorkspaceId) {
        setPrevWorkspaceId(activeWorkspaceId);
        if (query) {
            setQuery("");
        }
        if (activeTab !== "all") {
            setActiveTab("all");
        }
    }

    const trimmedQuery = query.trim();

    useEffect(() => {
        if (!trimmedQuery || !activeWorkspaceId || !userToken) {
            setRemoteResults({
                channels: [],
                members: [],
                channelMessages: [],
                directMessages: []
            });
            setIsSearchingMessages(false);
            setSearchError(null);
            return;
        }

        const controller = new AbortController();
        setIsSearchingMessages(true);
        setSearchError(null);

        const timerId = setTimeout(async () => {
            try {
                const res = await searchInWorkspaceService(
                    activeWorkspaceId,
                    trimmedQuery,
                    userToken,
                    controller.signal
                );
                if (!controller.signal.aborted) {
                    setRemoteResults({
                        channels: res?.data?.channels || [],
                        members: res?.data?.members || [],
                        channelMessages: res?.data?.channelMessages || [],
                        directMessages: res?.data?.directMessages || []
                    });
                    setIsSearchingMessages(false);
                }
            } catch (err) {
                if (err?.name === "AbortError") return;
                setSearchError(err?.message || "No se pudo completar la búsqueda.");
                setIsSearchingMessages(false);
            }
        }, DEBOUNCE_MS);

        return () => {
            clearTimeout(timerId);
            controller.abort();
        };
    }, [trimmedQuery, activeWorkspaceId, userToken]);

    const localChannels = useMemo(() => {
        if (!trimmedQuery) return [];
        const lower = trimmedQuery.toLowerCase();

        if (Array.isArray(currentChannelList) && currentChannelList.length > 0) {
            return currentChannelList
                .filter(
                    (ch) =>
                        ch.channel_name?.toLowerCase().includes(lower) ||
                        ch.channel_description?.toLowerCase().includes(lower)
                )
                .slice(0, 8)
                .map((ch) => ({
                    channel_id: ch.channel_id,
                    channel_name: ch.channel_name,
                    channel_description: ch.channel_description
                }));
        }

        return remoteResults.channels.map((ch) => ({
            channel_id: ch.channel_id,
            channel_name: capitalizeFirstLetter(ch.channel_name || ""),
            channel_description: capitalizeFirstLetter(ch.channel_description || "")
        }));
    }, [trimmedQuery, currentChannelList, remoteResults.channels]);

    const localMembers = useMemo(() => {
        if (!trimmedQuery) return [];
        const lower = trimmedQuery.toLowerCase();

        if (
            Array.isArray(currentWorkspaceMembers) &&
            currentWorkspaceMembers.length > 0
        ) {
            return currentWorkspaceMembers
                .filter((m) => {
                    const name = m.id_user?.userName?.toLowerCase() || "";
                    const email = m.id_user?.email?.toLowerCase() || "";
                    return name.includes(lower) || email.includes(lower);
                })
                .slice(0, 8)
                .map((m) => ({
                    user_id: m.id_user?._id,
                    userName: capitalizeFirstLetter(m.id_user?.userName || "Usuario"),
                    email: m.id_user?.email || "",
                    role: m.role,
                    isSelf:
                        Boolean(currentUserId) &&
                        String(m.id_user?._id) === String(currentUserId)
                }));
        }

        return remoteResults.members.map((m) => ({
            user_id: m.user_id,
            userName: capitalizeFirstLetter(m.userName || "Usuario"),
            email: m.email || "",
            role: m.role,
            isSelf: Boolean(currentUserId) && String(m.user_id) === String(currentUserId)
        }));
    }, [trimmedQuery, currentWorkspaceMembers, remoteResults.members, currentUserId]);

    const combinedMessages = useMemo(() => {
        if (!trimmedQuery) return [];

        const channelItems = (remoteResults.channelMessages || []).map((msg) => ({
            id: `ch-${msg.message_id}`,
            message_id: msg.message_id,
            kind: "channel-message",
            content: msg.content,
            createdAt: msg.createdAt,
            authorName: capitalizeFirstLetter(msg.author_name || "Usuario"),
            contextLabel: `#${capitalizeFirstLetter(msg.channel_name || "canal")}`,
            targetPath: `/workspaces/${activeWorkspaceId}/channels/${msg.channel_id}/messages`
        }));

        const dmItems = (remoteResults.directMessages || []).map((dm) => ({
            id: `dm-${dm.message_id}`,
            message_id: dm.message_id,
            kind: "direct-message",
            content: dm.content,
            createdAt: dm.createdAt,
            authorName: dm.is_own
                ? "Tú"
                : capitalizeFirstLetter(dm.author_name || "Usuario"),
            contextLabel: `Chat con ${capitalizeFirstLetter(dm.contact_name || "Usuario")}`,
            targetPath: `/workspaces/${activeWorkspaceId}/MessagesPrivate/${dm.contact_id}/messages`
        }));

        return [...channelItems, ...dmItems].sort(
            (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
        );
    }, [
        trimmedQuery,
        remoteResults.channelMessages,
        remoteResults.directMessages,
        activeWorkspaceId
    ]);

    const handleChangeQuery = useCallback(
        (e) => {
            const nextVal = e.target.value;
            setQuery(nextVal);
            if (!isOpen) {
                openDropdown();
            }
        },
        [isOpen, openDropdown]
    );

    const handleClearQuery = useCallback(() => {
        setQuery("");
        setActiveTab("all");
        setSearchError(null);
        inputRef.current?.focus();
    }, []);

    const handleSelectChannel = useCallback(
        (channelId) => {
            if (!activeWorkspaceId || !channelId) return;
            closeDropdown();
            navigate(`/workspaces/${activeWorkspaceId}/channels/${channelId}/messages`);
        },
        [activeWorkspaceId, closeDropdown, navigate]
    );

    const handleSelectMember = useCallback(
        (userId) => {
            if (!activeWorkspaceId || !userId) return;
            closeDropdown();
            navigate(`/workspaces/${activeWorkspaceId}/MessagesPrivate/${userId}/messages`);
        },
        [activeWorkspaceId, closeDropdown, navigate]
    );

    const handleSelectMessage = useCallback(
        (msgItem) => {
            if (!msgItem?.targetPath) return;
            closeDropdown();
            navigate(msgItem.targetPath, {
                state: {
                    highlightMessageId: msgItem.message_id,
                    highlightTick: Date.now()
                }
            });
        },
        [closeDropdown, navigate]
    );

    const handleSubmitFirstResult = useCallback(() => {
        if (!trimmedQuery) return;

        if (
            (activeTab === "all" || activeTab === "channels") &&
            localChannels.length > 0
        ) {
            handleSelectChannel(localChannels[0].channel_id);
            return;
        }

        if (
            (activeTab === "all" || activeTab === "members") &&
            localMembers.length > 0
        ) {
            handleSelectMember(localMembers[0].user_id);
            return;
        }

        if (
            (activeTab === "all" || activeTab === "messages") &&
            combinedMessages.length > 0
        ) {
            handleSelectMessage(combinedMessages[0]);
        }
    }, [
        trimmedQuery,
        activeTab,
        localChannels,
        localMembers,
        combinedMessages,
        handleSelectChannel,
        handleSelectMember,
        handleSelectMessage
    ]);

    const handleInputKeyDown = useCallback(
        (e) => {
            if (e.key === "Escape") {
                closeDropdown();
                inputRef.current?.blur();
            }
        },
        [closeDropdown]
    );

    useEffect(() => {
        const handleGlobalShortcut = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                inputRef.current?.focus();
                openDropdown();
            }
        };

        window.addEventListener("keydown", handleGlobalShortcut);
        return () => window.removeEventListener("keydown", handleGlobalShortcut);
    }, [openDropdown]);

    const totalCount =
        localChannels.length + localMembers.length + combinedMessages.length;

    return {
        query,
        trimmedQuery,
        activeTab,
        setActiveTab,
        channels: localChannels,
        members: localMembers,
        messages: combinedMessages,
        totalCount,
        isSearchingMessages,
        searchError,
        inputRef,
        handleChangeQuery,
        handleClearQuery,
        handleSelectChannel,
        handleSelectMember,
        handleSelectMessage,
        handleSubmitFirstResult,
        handleInputKeyDown
    };
}

export default useWorkspaceSearch;
