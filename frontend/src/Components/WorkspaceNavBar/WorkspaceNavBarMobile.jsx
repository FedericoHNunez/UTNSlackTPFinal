import { useContext, useState } from "react";
import { Link } from "react-router";
import "./WorkspaceNavBarMobile.css";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext";
import { UserContext } from "../../Context/UserContext/UserContext";

export function WorkspaceNavbarMobile() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { currentWorkspaceList, currentWorkspace_id } = useContext(WorkspaceContext);
    const { userData } = useContext(UserContext);

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    const currentWorkspaceObj = currentWorkspaceList?.find(
        (workspace) => workspace.workspace_id === currentWorkspace_id
    );
    const currentWorkspaceInitials = currentWorkspaceObj?.workspace_name
        ? currentWorkspaceObj.workspace_name.slice(0, 2).toUpperCase()
        : "WS";
    const userInitial = userData?.userName
        ? userData.userName.charAt(0).toUpperCase()
        : "M";

    return (
        <div className="workspace-nav-mobile">
            <button
                type="button"
                className={`workspace-nav-mobile-toggle ${isMenuOpen ? "is-open" : ""}`}
                aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                <span className="workspace-nav-mobile-burger-line" />
                <span className="workspace-nav-mobile-burger-line" />
                <span className="workspace-nav-mobile-burger-line" />
            </button>

            {isMenuOpen && (
                <div
                    className="workspace-nav-mobile-backdrop"
                    onClick={handleCloseMenu}
                    aria-hidden="true"
                />
            )}

            <div className={`workspace-nav-mobile-drawer ${isMenuOpen ? "is-open" : ""}`}>
                <div className="workspace-nav-mobile-group">
                    <div className="workspace-nav-mobile-header">
                        <button
                            type="button"
                            className="workspace-nav-mobile-avatar-btn"
                            title={currentWorkspaceObj?.workspace_name || "Espacio de trabajo"}
                        >
                            {currentWorkspaceInitials}
                        </button>
                        <span className="workspace-nav-mobile-workspace-name">
                            {currentWorkspaceObj?.workspace_name || "Espacio de trabajo"}
                        </span>
                    </div>

                    <ul className="workspace-nav-mobile-list" onClick={handleCloseMenu}>
                        <li className="workspace-nav-mobile-item">
                            <Link
                                to={
                                    currentWorkspace_id
                                        ? `/workspaces/${currentWorkspace_id}/channels`
                                        : "/workspaces"
                                }
                                className="workspace-nav-mobile-link is-active"
                            >
                                <span className="workspace-nav-mobile-icon-box" aria-hidden="true">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                    >
                                        <path d="M12 3.2 3 10.4V20a1 1 0 0 0 1 1h5.5v-6h5v6H20a1 1 0 0 0 1-1v-9.6l-9-7.2Z" />
                                    </svg>
                                </span>
                                <span className="workspace-nav-mobile-label">Inicio</span>
                            </Link>
                        </li>
                        <li className="workspace-nav-mobile-item">
                            <Link to="/" className="workspace-nav-mobile-link">
                                <span className="workspace-nav-mobile-icon-box" aria-hidden="true">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                                    </svg>
                                </span>
                                <span className="workspace-nav-mobile-label">Mensajes directos</span>
                            </Link>
                        </li>
                        <li className="workspace-nav-mobile-item">
                            <Link to="/direct" className="workspace-nav-mobile-link">
                                <span className="workspace-nav-mobile-icon-box" aria-hidden="true">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                    </svg>
                                </span>
                                <span className="workspace-nav-mobile-label">Actividad</span>
                            </Link>
                        </li>
                        <li className="workspace-nav-mobile-item">
                            <Link to="/profile" className="workspace-nav-mobile-link">
                                <span className="workspace-nav-mobile-icon-box" aria-hidden="true">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </span>
                                <span className="workspace-nav-mobile-label">Archivos</span>
                            </Link>
                        </li>
                        <li className="workspace-nav-mobile-item">
                            <Link to="/profile" className="workspace-nav-mobile-link">
                                <span className="workspace-nav-mobile-icon-box" aria-hidden="true">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="7.5" cy="7.5" r="3" />
                                        <circle cx="7.5" cy="16.5" r="3" />
                                        <circle cx="16.5" cy="16.5" r="3" />
                                        <path d="M16.5 4.5v6M13.5 7.5h6" />
                                    </svg>
                                </span>
                                <span className="workspace-nav-mobile-label">
                                    Agentes y herramientas
                                </span>
                            </Link>
                        </li>
                        <li className="workspace-nav-mobile-item">
                            <Link to="/profile" className="workspace-nav-mobile-link">
                                <span className="workspace-nav-mobile-icon-box" aria-hidden="true">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                    </svg>
                                </span>
                                <span className="workspace-nav-mobile-label">Administrador</span>
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="workspace-nav-mobile-group">
                    <ul className="workspace-nav-mobile-list workspace-nav-mobile-bottom-list">
                        <li className="workspace-nav-mobile-item">
                            <button
                                type="button"
                                className="workspace-nav-mobile-theme-btn"
                                aria-label="Cambiar tema"
                            >
                                <span className="workspace-nav-mobile-icon-box" aria-hidden="true">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.9"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                                    </svg>
                                </span>
                                <span className="workspace-nav-mobile-label">Tema</span>
                            </button>
                        </li>
                        <li className="workspace-nav-mobile-item">
                            <div
                                className="workspace-nav-mobile-user-row"
                                title={userData?.userName || "Mi perfil"}
                            >
                                <span className="workspace-nav-mobile-user-avatar">
                                    {userInitial}
                                    <span
                                        className="workspace-nav-mobile-status-dot"
                                        aria-hidden="true"
                                    />
                                </span>
                                <span className="workspace-nav-mobile-label">
                                    {userData?.userName || "Me"}
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default WorkspaceNavbarMobile;
