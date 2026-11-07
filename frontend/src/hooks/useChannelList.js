import { useEffect } from "react";
import useRequest from "./useRequest.js";
import { getChannelsByWorkspace } from "../services/ChannelService.js"

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
    };
};
