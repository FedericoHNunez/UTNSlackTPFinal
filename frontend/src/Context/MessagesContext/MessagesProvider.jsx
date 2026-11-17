import { useState, useContext, useEffect } from "react";
import { MessagesContext } from "./MessagesContext.jsx";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext.jsx";
import { ChannelContext } from "../ChannelContext/ChannelContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import { useMessageList, useCreateMessage } from "../../hooks/fetch/useMessage.js";

export const MessagesProvider = ({ children }) => {
    const [currentMessagesList, setCurrentMessagesList] = useState([]);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const { currentChannel_id } = useContext(ChannelContext);
    const { userToken } = useContext(UserContext);

    const {
        message_response,
        message_error,
        message_loading,
        message_sendRequest
    } = useMessageList(currentWorkspace_id, currentChannel_id, userToken);

    const {
        create_message_response,
        create_message_error,
        create_message_loading,
        createMessage
    } = useCreateMessage();

    useEffect(() => {
        if (message_response?.data?.messagesChannel) {
            setCurrentMessagesList(message_response.data.messagesChannel);
        }
    }, [message_response]);

    useEffect(() => {
        if (create_message_response?.data?.message) {
            const newMessage = create_message_response.data.message;
            setCurrentMessagesList((prev) => [...(prev || []), newMessage]);
        }
    }, [create_message_response]);

    const handleCreateMessage = (content) => {
        createMessage(currentWorkspace_id, currentChannel_id, content, userToken);
    };

    const values = {
        currentMessagesList,
        setCurrentMessagesList,
        message_error,
        message_loading,
        message_sendRequest,
        create_message_response,
        create_message_error,
        create_message_loading,
        handleCreateMessage
    };

    return (
        <MessagesContext.Provider value={values}>
            {children}
        </MessagesContext.Provider>
    );
};
