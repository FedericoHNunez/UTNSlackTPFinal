import { useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { WorkspaceContext } from "../Context/WorkspaceContext/WorkspaceContext";
import { UserContext } from "../Context/UserContext/UserContext";

export function useWorkspaceNav() {
    const { workspace_id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { currentWorkspaceList, currentWorkspace_id } = useContext(WorkspaceContext);
    const { userData, setUserToken } = useContext(UserContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const activeWorkspaceId = workspace_id || currentWorkspace_id;
    const isDirectMessagesActive = location.pathname.includes("/MessagesPrivate");

    const currentWorkspaceObj = currentWorkspaceList?.find(
        (workspace) => workspace.workspace_id === activeWorkspaceId
    );

    const currentWorkspaceInitials = currentWorkspaceObj?.workspace_name
        ? currentWorkspaceObj.workspace_name.slice(0, 2).toUpperCase()
        : "WS";

    const userInitial = userData?.userName
        ? userData.userName.charAt(0).toUpperCase()
        : "M";

    const toggleMobileMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = (onAfterClose) => {
        setIsMenuOpen(false);
        if (typeof onAfterClose === "function") {
            onAfterClose();
        }
    };

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
        isDirectMessagesActive,
        isMenuOpen,
        toggleMobileMenu,
        closeMobileMenu,
        handleLogout,
        handleBackToWorkspaces
    };
}

export default useWorkspaceNav;
