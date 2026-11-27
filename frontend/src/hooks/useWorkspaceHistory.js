import { useCallback, useContext, useEffect, useState } from "react";
import {
    useLocation,
    useNavigate,
    useNavigationType,
    useParams
} from "react-router";
import { ChannelContext } from "../Context/ChannelContext/ChannelContext.jsx";
import { MembersContext } from "../Context/MembersContext/MembersContext.jsx";
import { WorkspaceContext } from "../Context/WorkspaceContext/WorkspaceContext.jsx";
import { capitalizeFirstLetter } from "./useCapitalize.js";

const MAX_STACK_ENTRIES = 40;
const MAX_RECENT_PATHS = 10;

function normalizePath(path = "") {
    if (path.length > 1 && path.endsWith("/")) {
        return path.slice(0, -1);
    }
    return path;
}

function resolveRouteInfo(path, workspaceId, channelList, membersList) {
    if (!path || !workspaceId) return null;

    const normalizedPath = normalizePath(path);
    const wsPrefix = `/workspaces/${workspaceId}`;

    if (!normalizedPath.startsWith(wsPrefix)) {
        return null;
    }

    const subPath = normalizedPath.slice(wsPrefix.length);

    if (subPath === "" || subPath === "/channels") {
        return {
            path: normalizedPath,
            type: "channels-home",
            label: "Canales",
            displayTitle: "Canales",
            subtitle: "Vista general de canales",
            isAvailable: true
        };
    }

    const channelMatch = subPath.match(/^\/channels\/([^/]+)\/messages$/);
    if (channelMatch) {
        const channelId = channelMatch[1];
        const foundChannel = channelList?.find(
            (channel) => String(channel.channel_id) === String(channelId)
        );
        const hasLoadedChannels = Array.isArray(channelList);

        if (hasLoadedChannels && !foundChannel) {
            return {
                path: normalizedPath,
                type: "channel",
                label: "Canal eliminado",
                displayTitle: "#canal",
                subtitle: "No disponible",
                isAvailable: false
            };
        }

        const channelName = foundChannel?.channel_name || "Canal";
        return {
            path: normalizedPath,
            type: "channel",
            label: channelName,
            displayTitle: `#${channelName}`,
            subtitle: "Canal",
            isAvailable: true
        };
    }

    if (subPath === "/MessagesPrivate") {
        return {
            path: normalizedPath,
            type: "dm-home",
            label: "Mensajes directos",
            displayTitle: "Mensajes directos",
            subtitle: "Bandeja de mensajes privados",
            isAvailable: true
        };
    }

    const dmMatch = subPath.match(/^\/MessagesPrivate\/([^/]+)\/messages$/);
    if (dmMatch) {
        const targetUserId = dmMatch[1];
        const foundMember = membersList?.find(
            (member) => String(member.id_user?._id) === String(targetUserId)
        );
        const memberName = foundMember?.id_user?.userName
            ? capitalizeFirstLetter(foundMember.id_user.userName)
            : "Conversación privada";

        return {
            path: normalizedPath,
            type: "dm",
            label: memberName,
            displayTitle: memberName,
            subtitle: "Mensaje directo",
            isAvailable: true
        };
    }

    return {
        path: normalizedPath,
        type: "workspace",
        label: "Espacio de trabajo",
        displayTitle: "Espacio de trabajo",
        subtitle: "Vista general",
        isAvailable: true
    };
}

export function useWorkspaceHistory() {
    const { workspace_id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const navigationType = useNavigationType();

    const workspaceCtx = useContext(WorkspaceContext);
    const channelCtx = useContext(ChannelContext);
    const membersCtx = useContext(MembersContext);

    const activeWorkspaceId = workspace_id || workspaceCtx?.currentWorkspace_id;
    const currentChannelList = channelCtx?.currentChannelList;
    const currentWorkspaceMembers = membersCtx?.currentWorkspaceMembers;

    const currentPath = normalizePath(location.pathname);
    const trackingKey = activeWorkspaceId
        ? `${activeWorkspaceId}::${currentPath}`
        : "";

    const [historyByWorkspace, setHistoryByWorkspace] = useState({});
    const [lastTrackedKey, setLastTrackedKey] = useState("");

    if (
        activeWorkspaceId &&
        currentPath.startsWith(`/workspaces/${activeWorkspaceId}`) &&
        trackingKey !== lastTrackedKey
    ) {
        setLastTrackedKey(trackingKey);
        setHistoryByWorkspace((prev) => {
            const current = prev[activeWorkspaceId] || {
                entries: [],
                index: -1,
                recentPaths: [],
                pendingIndex: null
            };

            const updatedRecent = [
                currentPath,
                ...current.recentPaths.filter((p) => p !== currentPath)
            ].slice(0, MAX_RECENT_PATHS);

            if (
                current.pendingIndex !== null &&
                current.entries[current.pendingIndex]?.path === currentPath
            ) {
                return {
                    ...prev,
                    [activeWorkspaceId]: {
                        ...current,
                        index: current.pendingIndex,
                        recentPaths: updatedRecent,
                        pendingIndex: null
                    }
                };
            }

            if (navigationType === "POP") {
                if (
                    current.index > 0 &&
                    current.entries[current.index - 1]?.path === currentPath
                ) {
                    return {
                        ...prev,
                        [activeWorkspaceId]: {
                            ...current,
                            index: current.index - 1,
                            recentPaths: updatedRecent,
                            pendingIndex: null
                        }
                    };
                }

                if (
                    current.index < current.entries.length - 1 &&
                    current.entries[current.index + 1]?.path === currentPath
                ) {
                    return {
                        ...prev,
                        [activeWorkspaceId]: {
                            ...current,
                            index: current.index + 1,
                            recentPaths: updatedRecent,
                            pendingIndex: null
                        }
                    };
                }
            }

            if (current.entries[current.index]?.path === currentPath) {
                return {
                    ...prev,
                    [activeWorkspaceId]: {
                        ...current,
                        recentPaths: updatedRecent,
                        pendingIndex: null
                    }
                };
            }

            const baseEntries = current.entries.slice(0, current.index + 1);
            const nextEntries = [...baseEntries, { path: currentPath }].slice(
                -MAX_STACK_ENTRIES
            );

            return {
                ...prev,
                [activeWorkspaceId]: {
                    entries: nextEntries,
                    index: nextEntries.length - 1,
                    recentPaths: updatedRecent,
                    pendingIndex: null
                }
            };
        });
    }

    const wsHistory = (activeWorkspaceId && historyByWorkspace[activeWorkspaceId]) || {
        entries: currentPath ? [{ path: currentPath }] : [],
        index: currentPath ? 0 : -1,
        recentPaths: currentPath ? [currentPath] : [],
        pendingIndex: null
    };

    let previousTarget = null;
    for (let i = wsHistory.index - 1; i >= 0; i -= 1) {
        const candidatePath = wsHistory.entries[i]?.path;
        if (!candidatePath || candidatePath === currentPath) continue;
        const info = resolveRouteInfo(
            candidatePath,
            activeWorkspaceId,
            currentChannelList,
            currentWorkspaceMembers
        );
        if (info?.isAvailable) {
            previousTarget = { index: i, info };
            break;
        }
    }

    let nextTarget = null;
    for (let i = wsHistory.index + 1; i < wsHistory.entries.length; i += 1) {
        const candidatePath = wsHistory.entries[i]?.path;
        if (!candidatePath || candidatePath === currentPath) continue;
        const info = resolveRouteInfo(
            candidatePath,
            activeWorkspaceId,
            currentChannelList,
            currentWorkspaceMembers
        );
        if (info?.isAvailable) {
            nextTarget = { index: i, info };
            break;
        }
    }

    const canGoBack = Boolean(previousTarget);
    const canGoForward = Boolean(nextTarget);

    const jumpToStackIndex = useCallback(
        (target) => {
            if (!activeWorkspaceId || !target) return;
            const targetPath = target.info.path;

            setHistoryByWorkspace((prev) => {
                const current = prev[activeWorkspaceId];
                if (!current) return prev;
                return {
                    ...prev,
                    [activeWorkspaceId]: {
                        ...current,
                        index: target.index,
                        pendingIndex: target.index,
                        recentPaths: [
                            targetPath,
                            ...current.recentPaths.filter((p) => p !== targetPath)
                        ].slice(0, MAX_RECENT_PATHS)
                    }
                };
            });

            navigate(targetPath);
        },
        [activeWorkspaceId, navigate]
    );

    const goBack = useCallback(() => {
        if (previousTarget) {
            jumpToStackIndex(previousTarget);
        }
    }, [jumpToStackIndex, previousTarget]);

    const goForward = useCallback(() => {
        if (nextTarget) {
            jumpToStackIndex(nextTarget);
        }
    }, [jumpToStackIndex, nextTarget]);

    const navigateToPath = useCallback(
        (targetPath) => {
            if (!targetPath || normalizePath(targetPath) === currentPath) return;
            navigate(targetPath);
        },
        [currentPath, navigate]
    );

    const clearHistory = useCallback(() => {
        if (!activeWorkspaceId) return;
        setHistoryByWorkspace((prev) => ({
            ...prev,
            [activeWorkspaceId]: {
                entries: currentPath ? [{ path: currentPath }] : [],
                index: currentPath ? 0 : -1,
                recentPaths: currentPath ? [currentPath] : [],
                pendingIndex: null
            }
        }));
    }, [activeWorkspaceId, currentPath]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) {
                return;
            }

            const tagName = event.target?.tagName;
            if (
                tagName === "INPUT" ||
                tagName === "TEXTAREA" ||
                event.target?.isContentEditable
            ) {
                return;
            }

            if (event.key === "ArrowLeft" && canGoBack) {
                event.preventDefault();
                goBack();
            } else if (event.key === "ArrowRight" && canGoForward) {
                event.preventDefault();
                goForward();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [canGoBack, canGoForward, goBack, goForward]);

    const recentItems = wsHistory.recentPaths
        .map((path) => {
            const info = resolveRouteInfo(
                path,
                activeWorkspaceId,
                currentChannelList,
                currentWorkspaceMembers
            );
            if (!info || !info.isAvailable) return null;
            return {
                ...info,
                isCurrent: info.path === currentPath
            };
        })
        .filter(Boolean);

    return {
        canGoBack,
        canGoForward,
        previousItem: previousTarget?.info || null,
        nextItem: nextTarget?.info || null,
        recentItems,
        goBack,
        goForward,
        navigateToPath,
        clearHistory
    };
}

export default useWorkspaceHistory;
