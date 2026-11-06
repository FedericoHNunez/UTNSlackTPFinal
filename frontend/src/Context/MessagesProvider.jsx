import { useState, useContext, useEffect } from "react";
import { MessagesContext } from "./MessagesContext.jsx";
import { WorkspaceContext } from "./WorkspaceContext.jsx";
import { ChannelContext } from "./ChannelContext.jsx";
import { UserContext } from "./UserContext.jsx";
import { useMessageList } from "../hooks/useMessageList.js";

export const MessagesProvider = ({ children }) => {
    const [currentMessagesList, setCurrentMessagesList] = useState(null);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const { currentchannel_id } = useContext(ChannelContext);
    const { userToken } = useContext(UserContext);

    const {
        message_response,
        message_error,
        message_loading,
        message_sendRequest
    } = useMessageList(currentWorkspace_id, currentchannel_id, userToken);

    useEffect(() => {
        if (message_response?.data?.messagesChannel) {
            setCurrentMessagesList(message_response.data.messagesChannel);
        }
    }, [message_response]);

    const values = {
        currentMessagesList,
        setCurrentMessagesList,
        message_error,
        message_loading,
        message_sendRequest
    };

    return (
        <MessagesContext.Provider value={values}>
            {children}
        </MessagesContext.Provider>
    );
};
