import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router";
import { WorkspaceContext } from "./WorkspaceContext.jsx";
import {
    useGetWorkspaceList,
    useCreateWorkspace,
    useEditWorkspace,
    useDeleteWorkspace
} from "../../hooks/fetch/useWorkspace.js";
import { UserContext } from "../UserContext/UserContext.jsx";
import { capitalizeListFields } from "../../hooks/useCapitalize.js";

export const WorkspaceProvider = () => {

    const [currentWorkspace_id, setCurrentWorkspace_id] = useState(null);
    const [currentWorkspaceList, setCurrentWorkspaceList] = useState(null);
    const { userToken } = useContext(UserContext);
    const {
        get_workspace_loading,
        get_workspace_error, 
        get_workspace_response,
        getWorkspaceList
    } = useGetWorkspaceList(userToken);

    const {
        create_workspace_loading,
        create_workspace_error,
        create_workspace_response,
        createWorkspace
    } = useCreateWorkspace();

    const {
        edit_workspace_loading,
        edit_workspace_error,
        edit_workspace_response,
        editWorkspace
    } = useEditWorkspace();

    const {
        delete_workspace_loading,
        delete_workspace_error,
        delete_workspace_response,
        deleteWorkspace
    } = useDeleteWorkspace();

    useEffect(() => {
        if (get_workspace_response?.data?.workspaces) {
            setCurrentWorkspaceList(
                capitalizeListFields(get_workspace_response.data.workspaces, [
                    "workspace_name",
                    "workspace_description"
                ])
            );
        }
    }, [get_workspace_response]);

    useEffect(() => {
        if (create_workspace_response?.data?.workspace) {
            getWorkspaceList(false);
        }
    }, [create_workspace_response]);

    useEffect(() => {
        if (edit_workspace_response?.data?.workspace) {
            getWorkspaceList(false);
        }
    }, [edit_workspace_response]);

    useEffect(() => {
        if (delete_workspace_response?.ok) {
            getWorkspaceList(false);
        }
    }, [delete_workspace_response]);

    const handleCreateWorkspace = (name, description) => {
        createWorkspace(name, description, userToken);
    };

    const handleEditWorkspace = (name, description, workspace_id = currentWorkspace_id) => {
        editWorkspace(workspace_id, name, description, userToken);
    };

    const handleDeleteWorkspace = (workspace_id = currentWorkspace_id) => {
        deleteWorkspace(workspace_id, userToken);
    };

    const refreshWorkspaces = () => getWorkspaceList(false);

    const values = {
        get_workspace_loading,
        get_workspace_error,
        getWorkspaceList,
        refreshWorkspaces,
        currentWorkspaceList,
        currentWorkspace_id,
        setCurrentWorkspace_id,
        create_workspace_loading,
        create_workspace_error,
        create_workspace_response,
        handleCreateWorkspace,
        edit_workspace_loading,
        edit_workspace_error,
        edit_workspace_response,
        handleEditWorkspace,
        delete_workspace_loading,
        delete_workspace_error,
        delete_workspace_response,
        handleDeleteWorkspace
    };

    return (
        <WorkspaceContext.Provider value={values}>
            <Outlet />
        </WorkspaceContext.Provider>
    );
};

