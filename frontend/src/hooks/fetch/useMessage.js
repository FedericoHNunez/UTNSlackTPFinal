import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getMessagesByChannelID,
    createMessageChannel
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
