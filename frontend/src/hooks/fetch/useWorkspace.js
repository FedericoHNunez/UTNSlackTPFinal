import { useEffect } from "react";
import useRequest from "./useRequest.js";
import {
    getWorkspaceByUserService,
    createWorkspaceService,
    inviteNewUserService,
    editWorkspaceService,
    deleteWorkspaceService
} from "../../services/workspaceService.js";

export const useGetWorkspaceList = (userToken) => {
    const { loading, error, response, sendRequest } = useRequest();

    const getWorkspaceList = (showLoading = true) => {
        if (userToken) {
            sendRequest(() => getWorkspaceByUserService(userToken), showLoading);
        }
    };

    useEffect(() => {
        getWorkspaceList();
    }, [userToken]);

    return {
        get_workspace_loading: loading,
        get_workspace_error: error,
        get_workspace_response: response,
        getWorkspaceList
    };
};

export const useCreateWorkspace = () => {
    const { loading, error, response, sendRequest } = useRequest();

    const createWorkspace = (name, description, userToken) => {
        sendRequest(() => createWorkspaceService(name, description, userToken));
    };

    return {
        create_workspace_loading: loading,
        create_workspace_error: error,
        create_workspace_response: response,
        createWorkspace
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

export const useEditWorkspace = () => {
    const { loading, error, response, sendRequest } = useRequest();

    const editWorkspace = (workspace_id, name, description, token) => {
        sendRequest(() => editWorkspaceService(workspace_id, name, description, token));
    };

    return {
        edit_workspace_loading: loading,
        edit_workspace_error: error,
        edit_workspace_response: response,
        editWorkspace
    };
};

export const useDeleteWorkspace = () => {
    const { loading, error, response, sendRequest } = useRequest();

    const deleteWorkspace = (workspace_id, token) => {
        sendRequest(() => deleteWorkspaceService(workspace_id, token));
    };

    return {
        delete_workspace_loading: loading,
        delete_workspace_error: error,
        delete_workspace_response: response,
        deleteWorkspace
    };
};