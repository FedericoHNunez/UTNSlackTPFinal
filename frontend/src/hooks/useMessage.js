import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getMessagesByChannelID,
    createMessageChannel
} from "../services/messagesChannelService.js";

export const useMessageList = (workspace_id, channel_id, userToken) => {
    const { response, error, sendRequest, loading } = useRequest();

    useEffect(() => {
        if (workspace_id && channel_id && userToken) {
            sendRequest(() =>
                getMessagesByChannelID(workspace_id, channel_id, userToken)
            );
        }
    }, [workspace_id, channel_id, userToken]);

    return {
        message_response: response,
        message_error: error,
        message_loading: loading,
        message_sendRequest: sendRequest
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
