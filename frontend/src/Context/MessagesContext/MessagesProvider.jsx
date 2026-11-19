import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router";
import { MessagesContext } from "./MessagesContext.jsx";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext.jsx";
import { ChannelContext } from "../ChannelContext/ChannelContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import { useGetMessageList, useCreateMessage } from "../../hooks/fetch/useMessage.js";

export const MessagesProvider = () => {
    const [currentMessagesList, setCurrentMessagesList] = useState([]);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const { currentChannel_id } = useContext(ChannelContext);
    const { userToken } = useContext(UserContext);

    const {
        get_message_response,
        get_message_error,
        get_message_loading,
        get_message_sendRequest,
        getMessageList
    } = useGetMessageList(currentWorkspace_id, currentChannel_id, userToken);

    const {
        create_message_response,
        create_message_error,
        create_message_loading,
        createMessage
    } = useCreateMessage();

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

    const handleCreateMessage = (content) => {
        createMessage(currentWorkspace_id, currentChannel_id, content, userToken);
    };

    const values = {
        currentMessagesList,
        setCurrentMessagesList,
        get_message_error,
        get_message_loading,
        get_message_sendRequest,
        create_message_response,
        create_message_error,
        create_message_loading,
        handleCreateMessage
    };

    return (
        <MessagesContext.Provider value={values}>
            <Outlet />
        </MessagesContext.Provider>
    );
};
