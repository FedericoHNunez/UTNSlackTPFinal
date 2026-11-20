import { useContext } from "react";
import { useNavigate, useParams } from "react-router";
import { WorkspaceContext } from "../Context/WorkspaceContext/WorkspaceContext";
import { UserContext } from "../Context/UserContext/UserContext";

export function useWorkspaceNav() {
    const { workspace_id } = useParams();
    const { currentWorkspaceList, currentWorkspace_id } = useContext(WorkspaceContext);
    const { userData, setUserToken } = useContext(UserContext);
    const navigate = useNavigate();

    const activeWorkspaceId = workspace_id || currentWorkspace_id;

    const currentWorkspaceObj = currentWorkspaceList?.find(
        (workspace) => workspace.workspace_id === activeWorkspaceId
    );

    const currentWorkspaceInitials = currentWorkspaceObj?.workspace_name
        ? currentWorkspaceObj.workspace_name.slice(0, 2).toUpperCase()
        : "WS";

    const userInitial = userData?.userName
        ? userData.userName.charAt(0).toUpperCase()
        : "M";

    const handleLogout = (onBeforeNavigate) => {
        if (typeof onBeforeNavigate === "function") {
            onBeforeNavigate();
        }
        setUserToken(null);
        navigate("/");
    };

    const handleBackToWorkspaces = (onBeforeNavigate) => {
        if (typeof onBeforeNavigate === "function") {
            onBeforeNavigate();
        }
        navigate("/workspaces");
    };

    return {
        currentWorkspace_id: activeWorkspaceId,
        currentWorkspaceObj,
        currentWorkspaceInitials,
        userData,
        userInitial,
        handleLogout,
        handleBackToWorkspaces
    };
}

export default useWorkspaceNav;
