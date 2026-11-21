import { useState, useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router";
import { MessagesPrivateContext } from "./MessagesPrivateContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import {
    useGetDirectMessages,
    useCreateDirectMessage
} from "../../hooks/fetch/useDirectMessage.js";

export const MessagesPrivateProvider = () => {
    const { user_id } = useParams();
    const [currentReceiver_id, setCurrentReceiver_id] = useState(user_id || null);
    const [currentDirectMessages, setCurrentDirectMessages] = useState([]);
    const { userToken } = useContext(UserContext);

    useEffect(() => {
        if (user_id) {
            setCurrentReceiver_id(user_id);
        }
    }, [user_id]);

    const {
        get_direct_messages_response,
        get_direct_messages_error,
        get_direct_messages_loading,
        getDirectMessages
    } = useGetDirectMessages(currentReceiver_id, userToken);

    const {
        create_direct_message_response,
        create_direct_message_error,
        create_direct_message_loading,
        createDirectMessage
    } = useCreateDirectMessage();

    useEffect(() => {
        if (get_direct_messages_response?.data?.messages) {
            setCurrentDirectMessages(get_direct_messages_response.data.messages);
        }
    }, [get_direct_messages_response]);

    useEffect(() => {
        if (create_direct_message_response?.data?.newDirectMessage) {
            getDirectMessages(false);
        }
    }, [create_direct_message_response]);

    const handleCreateDirectMessage = (content) => {
        if (!currentReceiver_id) return;
        createDirectMessage(currentReceiver_id, content, userToken);
    };

    const values = {
        currentReceiver_id,
        setCurrentReceiver_id,
        currentDirectMessages,
        setCurrentDirectMessages,
        get_direct_messages_error,
        get_direct_messages_loading,
        create_direct_message_response,
        create_direct_message_error,
        create_direct_message_loading,
        handleCreateDirectMessage
    };

    return (
        <MessagesPrivateContext.Provider value={values}>
            <Outlet />
        </MessagesPrivateContext.Provider>
    );
};
