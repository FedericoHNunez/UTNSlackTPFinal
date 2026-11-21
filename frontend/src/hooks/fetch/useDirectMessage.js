import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getDirectConversations,
    getDirectMessagesByUserId,
    createDirectMessage as createDirectMessageService
} from "../../services/directMessageService.js";

export const useGetDirectConversations = (userToken) => {
    const { response, error, loading, sendRequest } = useRequest();

    const getConversations = (showLoading = true) => {
        if (userToken) {
            sendRequest(() => getDirectConversations(userToken), showLoading);
        }
    };

    useEffect(() => {
        getConversations();
    }, [userToken]);

    return {
        get_conversations_response: response,
        get_conversations_error: error,
        get_conversations_loading: loading,
        getConversations
    };
};

export const useGetDirectMessages = (user_id, userToken) => {
    const { response, error, loading, sendRequest } = useRequest();

    const getDirectMessages = (showLoading = true) => {
        if (user_id && userToken) {
            sendRequest(
                () => getDirectMessagesByUserId(user_id, userToken),
                showLoading
            );
        }
    };

    useEffect(() => {
        getDirectMessages();
    }, [user_id, userToken]);

    return {
        get_direct_messages_response: response,
        get_direct_messages_error: error,
        get_direct_messages_loading: loading,
        getDirectMessages
    };
};

export const useCreateDirectMessage = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const createDirectMessage = (user_id, message, userToken) => {
        sendRequest(() =>
            createDirectMessageService(user_id, message, userToken)
        );
    };

    return {
        create_direct_message_response: response,
        create_direct_message_error: error,
        create_direct_message_loading: loading,
        createDirectMessage
    };
};
