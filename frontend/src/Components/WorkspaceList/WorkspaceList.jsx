import { useContext } from "react";
import { Link } from "react-router";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import "./WorkspaceList.css";

const AVATAR_THEMES = [
    "workspace-avatar-theme-1",
    "workspace-avatar-theme-2",
    "workspace-avatar-theme-3",
];

export const WorkspaceList = () => {
    const { wokspace_error, currentWorkspaceList } = useContext(WorkspaceContext);

    return (
        <div className="workspace-card">
            <div className="workspace-card-tabs">
                <span className="workspace-tab-active">Espacios de trabajo</span>
            </div>

            <div className="workspace-card-body">
                <p className="workspace-ready-label">Listo para comenzar</p>

                {wokspace_error && (
                    <div className="form-alert form-alert-error workspace-error-alert">
                        <p>{wokspace_error}</p>
                    </div>
                )}

                {currentWorkspaceList && currentWorkspaceList.length === 0 && (
                    <p className="workspace-empty-text">
                        Aún no perteneces a ningún espacio de trabajo.
                    </p>
                )}

                {currentWorkspaceList && currentWorkspaceList.length > 0 && (
                    <ul className="workspace-items-list">
                        {currentWorkspaceList.map((workspace, index) => {
                            const themeClass =
                                AVATAR_THEMES[index % AVATAR_THEMES.length];
                            const initial = workspace.workspace_name
                                ? workspace.workspace_name.charAt(0).toUpperCase()
                                : "W";

                            return (
                                <li
                                    key={workspace.workspace_id}
                                    className="workspace-item"
                                >
                                    <Link
                                        to={`/workspaces/${workspace.workspace_id}/channels`}
                                        className="workspace-item-link"
                                    >
                                        <div
                                            className={`workspace-item-avatar ${themeClass}`}
                                            aria-hidden="true"
                                        >
                                            <span>{initial}</span>
                                        </div>

                                        <div className="workspace-item-info">
                                            <h2>{workspace.workspace_name}</h2>
                                            <div className="workspace-item-meta">
                                                <div
                                                    className="workspace-member-pills"
                                                    aria-hidden="true"
                                                >
                                                    <span className="member-pill pill-teal">
                                                        {initial}
                                                    </span>
                                                </div>
                                                <p>
                                                    {workspace.workspace_members_count}
                                                    {workspace.workspace_members_count === 1
                                                        ? " miembro"
                                                        : " miembros"}
                                                </p>
                                            </div>
                                        </div>

                                        <span
                                            className="workspace-item-arrow"
                                            aria-hidden="true"
                                        >
                                            →
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>

            <div className="workspace-card-footer">
                {currentWorkspaceList &&
                    (currentWorkspaceList.length === 0 ? (
                        <button type="button" className="workspace-create-link-btn">
                            Crea tu primer espacio de trabajo
                        </button>
                    ) : (
                        <button type="button" className="workspace-create-link-btn">
                            Crea un nuevo espacio de trabajo
                        </button>
                    ))}

                <p className="workspace-footer-help">
                    ¿No puedes ver tu espacio de trabajo?{" "}
                    <Link to="/login" className="form-link">
                        Prueba con otro correo electrónico
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default WorkspaceList;
