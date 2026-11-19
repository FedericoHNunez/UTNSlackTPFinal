import { useContext } from "react";
import { useNavigate } from "react-router";
import { WorkspaceContext } from "../Context/WorkspaceContext/WorkspaceContext";
import { UserContext } from "../Context/UserContext/UserContext";

export function useWorkspaceNav() {
    const { currentWorkspaceList, currentWorkspace_id } = useContext(WorkspaceContext);
    const { userData, setUserToken } = useContext(UserContext);
    const navigate = useNavigate();

    const currentWorkspaceObj = currentWorkspaceList?.find(
        (workspace) => workspace.workspace_id === currentWorkspace_id
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

    return {
        currentWorkspace_id,
        currentWorkspaceObj,
        currentWorkspaceInitials,
        userData,
        userInitial,
        handleLogout
    };
}

export default useWorkspaceNav;
