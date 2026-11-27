import { useState, useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { DirectMessagesContext } from "./DirectMessagesContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext.jsx";
import {
    useGetDirectMessages,
    useCreateDirectMessage,
    useGetConversations,
    useEditDirectMessage,
    useDeleteDirectMessage
} from "../../hooks/fetch/useDirectMessage.js";

export const DirectMessagesProvider = () => {
    const { workspace_id, user_id } = useParams();
    const [currentReceiver_id, setCurrentReceiver_id] = useState(user_id || null);
    const [currentDirectMessages, setCurrentDirectMessages] = useState([]);
    const [currentDirectConversations, setCurrentDirectConversations] = useState([]);
    const { userToken } = useContext(UserContext);
    const { currentWorkspace_id } = useContext(WorkspaceContext);

    const activeWorkspaceId = workspace_id || currentWorkspace_id;

    useEffect(() => {
        setCurrentReceiver_id(user_id || null);
    }, [user_id]);

    const {
        get_direct_messages_response,
        get_direct_messages_error,
        get_direct_messages_loading,
        getDirectMessages
    } = useGetDirectMessages(currentReceiver_id, userToken, activeWorkspaceId);

    const {
        create_direct_message_response,
        create_direct_message_error,
        create_direct_message_loading,
        createDirectMessage
    } = useCreateDirectMessage();

    const {
        edit_direct_message_response,
        edit_direct_message_error,
        edit_direct_message_loading,
        editDirectMessage
    } = useEditDirectMessage();

    const {
        delete_direct_message_response,
        delete_direct_message_error,
        delete_direct_message_loading,
        deleteDirectMessage
    } = useDeleteDirectMessage();

    const {
        get_conversations_response,
        get_conversations_error,
        get_conversations_loading,
        getConversations
    } = useGetConversations(userToken, activeWorkspaceId);

    useEffect(() => {
        if (get_direct_messages_response?.data?.messages) {
            setCurrentDirectMessages(get_direct_messages_response.data.messages);
        }
    }, [get_direct_messages_response]);

    useEffect(() => {
        if (create_direct_message_response?.data?.newDirectMessage) {
            getDirectMessages(false);
            getConversations(false);
        }
    }, [create_direct_message_response]);

    useEffect(() => {
        const updated = edit_direct_message_response?.data?.editedMessage;
        if (updated?._id) {
            setCurrentDirectMessages((prev) =>
                prev.map((msg) =>
                    msg._id === updated._id
                        ? {
                              ...msg,
                              content: updated.content,
                              updatedAt: updated.updatedAt || new Date().toISOString()
                          }
                        : msg
                )
            );
            getDirectMessages(false);
            getConversations(false);
        }
    }, [edit_direct_message_response]);

    useEffect(() => {
        const deleted = delete_direct_message_response?.data?.deletedMessage;
        if (deleted?._id) {
            setCurrentDirectMessages((prev) =>
                prev.map((msg) =>
                    msg._id === deleted._id
                        ? {
                              ...msg,
                              active: false,
                              content: deleted.content || "Este mensaje fue eliminado."
                          }
                        : msg
                )
            );
            getDirectMessages(false);
            getConversations(false);
        }
    }, [delete_direct_message_response]);

    useEffect(() => {
        if (get_conversations_response?.data?.directConversations) {
            setCurrentDirectConversations(
                get_conversations_response.data.directConversations
            );
        }
    }, [get_conversations_response]);

    const handleCreateDirectMessage = (content) => {
        if (!currentReceiver_id || !activeWorkspaceId) return;
        createDirectMessage(currentReceiver_id, content, userToken, activeWorkspaceId);
    };

    const handleEditDirectMessage = (message_id, content) => {
        if (!currentReceiver_id || !activeWorkspaceId || !message_id) return;
        return editDirectMessage(
            currentReceiver_id,
            message_id,
            content,
            userToken,
            activeWorkspaceId
        );
    };

    const handleDeleteDirectMessage = (message_id) => {
        if (!currentReceiver_id || !activeWorkspaceId || !message_id) return;
        return deleteDirectMessage(
            currentReceiver_id,
            message_id,
            userToken,
            activeWorkspaceId
        );
    };

    const refreshConversations = () => getConversations(false);

    const refreshDirectMessages = () =>
        Promise.all([getDirectMessages(false), getConversations(false)]);

    const values = {
        currentReceiver_id,
        setCurrentReceiver_id,
        currentDirectMessages,
        setCurrentDirectMessages,
        get_direct_messages_error,
        get_direct_messages_loading,
        getDirectMessages,
        refreshDirectMessages,
        create_direct_message_response,
        create_direct_message_error,
        create_direct_message_loading,
        handleCreateDirectMessage,
        edit_direct_message_response,
        edit_direct_message_error,
        edit_direct_message_loading,
        handleEditDirectMessage,
        delete_direct_message_response,
        delete_direct_message_error,
        delete_direct_message_loading,
        handleDeleteDirectMessage,
        get_conversations_response,
        get_conversations_error,
        get_conversations_loading,
        currentDirectConversations,
        setCurrentDirectConversations,
        getConversations,
        refreshConversations
    };

    return (
        <DirectMessagesContext.Provider value={values}>
            <Outlet />
        </DirectMessagesContext.Provider>
    );
};
