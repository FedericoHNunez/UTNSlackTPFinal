import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getMessagesByChannelID,
    createMessageChannel,
    editMessageChannel,
    deleteMessageChannel
} from "../../services/messagesChannelService.js";

export const useGetMessageList = (workspace_id, channel_id, userToken) => {
    const { response, error, sendRequest, loading } = useRequest();

    const getMessageList = (showLoading = true) => {
        if (workspace_id && channel_id && userToken) {
            return sendRequest(
                () => getMessagesByChannelID(workspace_id, channel_id, userToken),
                showLoading
            );
        }
        return Promise.resolve();
    };

    useEffect(() => {
        getMessageList();
    }, [workspace_id, channel_id, userToken]);

    return {
        get_message_response: response,
        get_message_error: error,
        get_message_loading: loading,
        get_message_sendRequest: sendRequest,
        getMessageList
    };
};

export const useCreateMessage = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const createMessage = (workspace_id, channel_id, content, userToken) => {
        sendRequest(() =>
            createMessageChannel(workspace_id, channel_id, content, userToken)
        );
    };

    return {
        create_message_response: response,
        create_message_error: error,
        create_message_loading: loading,
        createMessage
    };
};

export const useEditMessage = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const editMessage = (workspace_id, channel_id, message_id, content, userToken) => {
        return sendRequest(() =>
            editMessageChannel(workspace_id, channel_id, message_id, content, userToken)
        );
    };

    return {
        edit_message_response: response,
        edit_message_error: error,
        edit_message_loading: loading,
        editMessage
    };
};

export const useDeleteMessage = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const deleteMessage = (workspace_id, channel_id, message_id, userToken) => {
        return sendRequest(() =>
            deleteMessageChannel(workspace_id, channel_id, message_id, userToken)
        );
    };

    return {
        delete_message_response: response,
        delete_message_error: error,
        delete_message_loading: loading,
        deleteMessage
    };
};
