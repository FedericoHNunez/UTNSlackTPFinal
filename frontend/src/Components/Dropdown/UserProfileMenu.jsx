import { useDropdown } from "../../hooks/useDropdown";
import { useWorkspaceNav } from "../../hooks/useWorkspaceNav";
import { UserProfileDropdown } from "./UserProfileDropdown";
import "./UserProfileMenu.css";

export function UserProfileMenu({
    position = "bottom-right",
    size = "md",
    showLabel = false,
    className = "",
    onAfterLogout
}) {
    const { userData, userInitial, handleLogout } = useWorkspaceNav();
    const {
        isOpen: isProfileOpen,
        toggle: toggleProfile,
        close: closeProfile,
        dropdownRef: profileRef
    } = useDropdown();

    const onLogoutClick = () => {
        handleLogout(() => {
            closeProfile();
            if (typeof onAfterLogout === "function") {
                onAfterLogout();
            }
        });
    };

    return (
        <div
            className={`user-profile-menu ${
                showLabel ? "user-profile-menu--with-label" : ""
            } ${className}`.trim()}
            ref={profileRef}
        >
            <button
                type="button"
                className={`user-profile-menu-trigger ${
                    showLabel
                        ? "user-profile-menu-trigger--row"
                        : `user-profile-menu-trigger--avatar user-profile-menu-trigger--${size}`
                }`}
                title={userData?.userName || "Mi perfil"}
                aria-label="Menú de usuario"
                aria-expanded={isProfileOpen}
                onClick={toggleProfile}
            >
                <span
                    className={`user-profile-menu-avatar user-profile-menu-avatar--${size}`}
                >
                    <span>{userInitial}</span>
                    <span
                        className="user-profile-menu-status-dot"
                        aria-hidden="true"
                    />
                </span>
                {showLabel && (
                    <span className="user-profile-menu-label">
                        {userData?.userName || "Me"}
                    </span>
                )}
            </button>

            <UserProfileDropdown
                isOpen={isProfileOpen}
                position={position}
                userData={userData}
                userInitial={userInitial}
                onLogout={onLogoutClick}
            />
        </div>
    );
}

export default UserProfileMenu;
