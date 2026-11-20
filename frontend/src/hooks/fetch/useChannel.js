import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getChannelsByWorkspace,
    createChannel as createChannelService,
    editChannel as editChannelService,
    deleteChannel as deleteChannelService
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

export const useEditChannel = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const editChannel = (workspace_id, channel_id, name, description, userToken) => {
        sendRequest(() =>
            editChannelService(workspace_id, channel_id, name, description, userToken)
        );
    };

    return {
        edit_channel_response: response,
        edit_channel_error: error,
        edit_channel_loading: loading,
        editChannel
    };
};

export const useDeleteChannel = () => {
    const { response, error, loading, sendRequest } = useRequest();

    const deleteChannel = (workspace_id, channel_id, userToken) => {
        sendRequest(() =>
            deleteChannelService(workspace_id, channel_id, userToken)
        );
    };

    return {
        delete_channel_response: response,
        delete_channel_error: error,
        delete_channel_loading: loading,
        deleteChannel
    };
};
