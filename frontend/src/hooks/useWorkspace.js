import { useEffect } from "react";
import useRequest from "./useRequest.js";
import { getWorkspaceByUser, inviteNewUser as inviteNewUserService } from "../services/workspaceService.js";

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

export const useInviteNewUser = () => {
    const { loading, error, response, sendRequest } = useRequest();

    const inviteNewUser = (email, token) => {
        sendRequest(() => inviteNewUserService(email, token));
    };

    return {
        invite_new_user_loading: loading,
        invite_new_user_error: error,
        invite_new_user_response: response,
        inviteNewUser
    };
};
