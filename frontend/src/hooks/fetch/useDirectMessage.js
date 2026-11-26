import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getDirectConversations,
    getDirectMessagesByUserId,
    createDirectMessage as createDirectMessageService
} from "../../services/directMessageService.js";

export const useGetDirectMessages = (user_id, userToken, workspace_id) => {
    const { response, error, loading, sendRequest } = useRequest();

    const getDirectMessages = (showLoading = true) => {
        if (user_id && userToken && workspace_id) {
            return sendRequest(
                () => getDirectMessagesByUserId(user_id, userToken, workspace_id),
                showLoading
            );
        }
        return Promise.resolve();
    };

    useEffect(() => {
        getDirectMessages();
    }, [user_id, userToken, workspace_id]);

    return {
        get_direct_messages_response: response,
        get_direct_messages_error: error,
        get_direct_messages_loading: loading,
        getDirectMessages
    };
};

export const useCreateDirectMessage = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const createDirectMessage = (user_id, message, userToken, workspace_id) => {
        sendRequest(() =>
            createDirectMessageService(user_id, message, userToken, workspace_id)
        );
    };

    return {
        create_direct_message_response: response,
        create_direct_message_error: error,
        create_direct_message_loading: loading,
        createDirectMessage
    };
};

export const useGetConversations = (userToken, workspace_id) => {
    const { response, error, loading, sendRequest } = useRequest();

    const getConversations = (showLoading = true) => {
        if (userToken && workspace_id) {
            return sendRequest(() => getDirectConversations(userToken, workspace_id), showLoading);
        }
        return Promise.resolve();
    };

    useEffect(() => {
        getConversations();
    }, [userToken, workspace_id]);

    return {
        get_conversations_response: response,
        get_conversations_error: error,
        get_conversations_loading: loading,
        getConversations
    };
};
