import {
    DropdownMenu,
    DropdownItem,
    DropdownDivider
} from "./DropdownMenu";
import "./UserProfileDropdown.css";

export function UserProfileDropdown({
    isOpen,
    position = "side-bottom",
    userData,
    userInitial,
    onLogout
}) {
    return (
        <DropdownMenu isOpen={isOpen} position={position}>
            <div className="user-profile-dropdown-header">
                <div className="user-profile-dropdown-avatar">
                    <span>{userInitial}</span>
                    <span
                        className="user-profile-dropdown-status-dot"
                        aria-hidden="true"
                    />
                </div>
                <div className="user-profile-dropdown-info">
                    <span className="user-profile-dropdown-name">
                        {userData?.userName || "Usuario"}
                    </span>
                    {userData?.email && (
                        <span className="user-profile-dropdown-email">
                            {userData.email}
                        </span>
                    )}
                    <span className="user-profile-dropdown-status">
                        <span className="user-profile-dropdown-status-indicator" />
                        Activo
                    </span>
                </div>
            </div>

            <DropdownDivider />

            <DropdownItem variant="danger" onClick={onLogout}>
                <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Cerrar sesión</span>
            </DropdownItem>
        </DropdownMenu>
    );
}

export default UserProfileDropdown;
