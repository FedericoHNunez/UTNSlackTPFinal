import { useState, useContext, useEffect } from "react";
import { WorkspaceContext } from "./WorkspaceContext.jsx";
import { useWorkspaceList } from "../../hooks/useWorkspaceList.js";
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

    useEffect(() => {
        if (wokspace_response?.data?.workspaces) {
            setCurrentWorkspaceList(wokspace_response.data.workspaces);
        }
    }, [wokspace_response]);

    const values = {
        workspace_loading,
        wokspace_error,
        currentWorkspaceList,
        currentWorkspace_id,
        setCurrentWorkspace_id
    };

    return (
        <WorkspaceContext.Provider value={values}>
            {children}
        </WorkspaceContext.Provider>
    );
};

