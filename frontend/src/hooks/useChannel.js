import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getChannelsByWorkspace,
    createChannel as createChannelService
} from "../services/ChannelService.js";

export const useChannelList = (workspace_id, userToken) => {
    const { response, error, loading, sendRequest } = useRequest();

    useEffect(() => {
        if (workspace_id && userToken) {
            sendRequest(() => getChannelsByWorkspace(workspace_id, userToken));
        }
    }, [workspace_id, userToken]);

    return {
        channel_response: response,
        channel_error: error,
        channel_loading: loading,
        channel_sendRequest: sendRequest
    };
};

export const useCreateChannel = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const createChannel = (workspace_id, name, description, userToken) => {
        sendRequest(() =>
            createChannelService(workspace_id, name, description, userToken)
        );
    };

    return {
        create_channel_response: response,
        create_channel_error: error,
        create_channel_loading: loading,
        createChannel
    };
};
