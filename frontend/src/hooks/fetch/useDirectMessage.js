import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getDirectConversations,
    getDirectMessagesByUserId,
    createDirectMessage as createDirectMessageService,
    editDirectMessage as editDirectMessageService,
    deleteDirectMessage as deleteDirectMessageService
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

export const useEditDirectMessage = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const editDirectMessage = (user_id, message_id, content, userToken, workspace_id) => {
        return sendRequest(() =>
            editDirectMessageService(user_id, message_id, content, userToken, workspace_id)
        );
    };

    return {
        edit_direct_message_response: response,
        edit_direct_message_error: error,
        edit_direct_message_loading: loading,
        editDirectMessage
    };
};

export const useDeleteDirectMessage = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const deleteDirectMessage = (user_id, message_id, userToken, workspace_id) => {
        return sendRequest(() =>
            deleteDirectMessageService(user_id, message_id, userToken, workspace_id)
        );
    };

    return {
        delete_direct_message_response: response,
        delete_direct_message_error: error,
        delete_direct_message_loading: loading,
        deleteDirectMessage
    };
};
