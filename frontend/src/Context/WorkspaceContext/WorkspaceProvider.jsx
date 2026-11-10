import { useState, useContext, useEffect } from "react";
import { WorkspaceContext } from "./WorkspaceContext.jsx";
import { useWorkspaceList, useCreateWorkspace } from "../../hooks/useWorkspace.js";
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

    const handleCreateWorkspace = (name, description) => {
        createWorkspace(name, description, userToken);
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
        handleCreateWorkspace
    };

    return (
        <WorkspaceContext.Provider value={values}>
            {children}
        </WorkspaceContext.Provider>
    );
};

