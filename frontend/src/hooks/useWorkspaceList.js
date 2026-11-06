import { useEffect } from "react";
import useRequest from "../hooks/useRequest.js";
import { getWorkspaceByUser } from "../services/workspaceService.js";


export const useWorkspaceList = (userToken) => {
    const { loading, error, response, sendRequest } = useRequest();

    useEffect(() => {
        if (userToken) {
            sendRequest(() => getWorkspaceByUser(userToken));
        }
    }, [userToken]);

    return {
        workspace_loading: loading,
        wokspace_error: error,
        wokspace_response: response
    };
};
