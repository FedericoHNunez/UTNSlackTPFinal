import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getChannelsByWorkspace,
    createChannel as createChannelService
} from "../../services/ChannelService.js";

export const useGetChannelList = (workspace_id, userToken) => {
    const { response, error, loading, sendRequest } = useRequest();

    const getChannelList = (showLoading = true) => {
        if (workspace_id && userToken) {
            sendRequest(() => getChannelsByWorkspace(workspace_id, userToken), showLoading);
        }
    };

    useEffect(() => {
        getChannelList();
    }, [workspace_id, userToken]);

    return {
        get_channel_response: response,
        get_channel_error: error,
        get_channel_loading: loading,
        get_channel_sendRequest: sendRequest,
        getChannelList
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
