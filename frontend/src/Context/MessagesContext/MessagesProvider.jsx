import { useState, useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { MessagesContext } from "./MessagesContext.jsx";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext.jsx";
import { ChannelContext } from "../ChannelContext/ChannelContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import {
    useGetMessageList,
    useCreateMessage,
    useEditMessage,
    useDeleteMessage
} from "../../hooks/fetch/useMessage.js";

export const MessagesProvider = () => {
    const { workspace_id, channel_id } = useParams();
    const [currentMessagesList, setCurrentMessagesList] = useState([]);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const { currentChannel_id } = useContext(ChannelContext);
    const { userToken } = useContext(UserContext);

    const activeWorkspaceId = workspace_id || currentWorkspace_id;
    const activeChannelId = channel_id || currentChannel_id;

    const {
        get_message_response,
        get_message_error,
        get_message_loading,
        get_message_sendRequest,
        getMessageList
    } = useGetMessageList(activeWorkspaceId, activeChannelId, userToken);

    const {
        create_message_response,
        create_message_error,
        create_message_loading,
        createMessage
    } = useCreateMessage();

    const {
        edit_message_response,
        edit_message_error,
        edit_message_loading,
        editMessage
    } = useEditMessage();

    const {
        delete_message_response,
        delete_message_error,
        delete_message_loading,
        deleteMessage
    } = useDeleteMessage();

    useEffect(() => {
        if (get_message_response?.data?.messagesChannel) {
            setCurrentMessagesList(get_message_response.data.messagesChannel);
        }
    }, [get_message_response]);

    useEffect(() => {
        if (create_message_response?.data?.message) {
            getMessageList(false);
        }
    }, [create_message_response]);

    useEffect(() => {
        const updated = edit_message_response?.data?.message;
        if (updated?._id) {
            setCurrentMessagesList((prev) =>
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
            getMessageList(false);
        }
    }, [edit_message_response]);

    useEffect(() => {
        const deleted = delete_message_response?.data?.message;
        if (deleted?._id) {
            setCurrentMessagesList((prev) =>
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
            getMessageList(false);
        }
    }, [delete_message_response]);

    const handleCreateMessage = (content) => {
        createMessage(activeWorkspaceId, activeChannelId, content, userToken);
    };

    const handleEditMessage = (message_id, content) => {
        if (!activeWorkspaceId || !activeChannelId || !message_id) return;
        return editMessage(activeWorkspaceId, activeChannelId, message_id, content, userToken);
    };

    const handleDeleteMessage = (message_id) => {
        if (!activeWorkspaceId || !activeChannelId || !message_id) return;
        return deleteMessage(activeWorkspaceId, activeChannelId, message_id, userToken);
    };

    const refreshMessages = () => getMessageList(false);

    const values = {
        currentMessagesList,
        setCurrentMessagesList,
        get_message_error,
        get_message_loading,
        get_message_sendRequest,
        getMessageList,
        refreshMessages,
        create_message_response,
        create_message_error,
        create_message_loading,
        handleCreateMessage,
        edit_message_response,
        edit_message_error,
        edit_message_loading,
        handleEditMessage,
        delete_message_response,
        delete_message_error,
        delete_message_loading,
        handleDeleteMessage
    };

    return (
        <MessagesContext.Provider value={values}>
            <Outlet />
        </MessagesContext.Provider>
    );
};
