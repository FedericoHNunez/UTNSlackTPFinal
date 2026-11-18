import { useState, useContext, useEffect } from "react";
import { WorkspaceContext } from "./WorkspaceContext.jsx";
import {
    useWorkspaceList,
    useCreateWorkspace,
    useEditWorkspace,
    useDeleteWorkspace
} from "../../hooks/fetch/useWorkspace.js";
import { UserContext } from "../UserContext/UserContext.jsx";

export const WorkspaceProvider = ({ children }) => {

    const [currentWorkspace_id, setCurrentWorkspace_id] = useState(null);
    const [currentWorkspaceList, setCurrentWorkspaceList] = useState(null);
    const { userToken } = useContext(UserContext);
    const {
        workspace_loading,
        wokspace_error, 
        wokspace_response
    } = useWorkspaceList(userToken);

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
        if (wokspace_response?.data?.workspaces) {
            setCurrentWorkspaceList(wokspace_response.data.workspaces);
        }
    }, [wokspace_response]);

    useEffect(() => {
        if (create_workspace_response?.data?.workspace) {
            const newWorkspace = create_workspace_response.data.workspace;
            const newMember = create_workspace_response.data.member;

            setCurrentWorkspaceList((prev) => [
                ...(prev || []),
                {
                    member_id: newMember?._id,
                    workspace_id: newWorkspace._id,
                    workspace_name: newWorkspace.name,
                    workspace_description: newWorkspace.description,
                    workspace_role: newMember?.role || "owner",
                    workspace_creation_date: newWorkspace.createdAt,
                    workspace_members_count: 1
                }
            ]);
        }
    }, [create_workspace_response]);

    useEffect(() => {
        if (edit_workspace_response?.data?.workspace) {
            const updatedWorkspace = edit_workspace_response.data.workspace;

            setCurrentWorkspaceList((prev) =>
                (prev || []).map((workspace) =>
                    workspace.workspace_id === updatedWorkspace._id
                        ? {
                              ...workspace,
                              workspace_name: updatedWorkspace.name,
                              workspace_description: updatedWorkspace.description
                          }
                        : workspace
                )
            );
        }
    }, [edit_workspace_response]);

    useEffect(() => {
        if (delete_workspace_response?.ok) {
            const deletedWorkspaceId =
                delete_workspace_response.data?.result?.deletedWorkspace?._id ||
                currentWorkspace_id;

            setCurrentWorkspaceList((prev) =>
                (prev || []).filter(
                    (workspace) => workspace.workspace_id !== deletedWorkspaceId
                )
            );

            if (currentWorkspace_id === deletedWorkspaceId) {
                setCurrentWorkspace_id(null);
            }
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

    const values = {
        workspace_loading,
        wokspace_error,
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
            {children}
        </WorkspaceContext.Provider>
    );
};

