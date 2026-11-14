import { useContext } from "react";
import { useParams } from "react-router";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import "./WorkSpaceDescription.css";

export const WorkSpaceDescription = ({ onConfigClick }) => {
    const { workspace_id } = useParams();
    const { currentWorkspaceList, currentWorkspace_id } = useContext(WorkspaceContext);

    const activeId = currentWorkspace_id || workspace_id;
    const workspace = currentWorkspaceList?.find(
        (ws) => ws.workspace_id === activeId
    );

    return (
        <section className="workspace-description" aria-label="Información del espacio de trabajo">
            <header className="workspace-description-header">
                <h2 className="workspace-description-name">
                    {workspace?.workspace_name || "Espacio de trabajo"}
                    <span className="workspace-description-chevron" aria-hidden="true">⌄</span>
                </h2>

                <button
                    type="button"
                    className="workspace-description-config-btn"
                    aria-label="Configuración del espacio de trabajo"
                    title="Configuración"
                    onClick={onConfigClick}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                </button>
            </header>

            <div className="workspace-description-card">
                <div className="workspace-description-icon" aria-hidden="true">
                    {workspace?.workspace_name?.charAt(0).toUpperCase() || "W"}
                </div>
                <div className="workspace-description-texts">
                    <p className="workspace-description-text" title={workspace?.workspace_description}>
                        {workspace?.workspace_description || "Sin descripción"}
                    </p>
                    {workspace?.workspace_members_count !== undefined && (
                        <p className="workspace-description-meta">
                            {workspace.workspace_members_count} miembro{workspace.workspace_members_count === 1 ? "" : "s"}
                        </p>
                    )}
                </div>
            </div>
        </section>
    );
};

