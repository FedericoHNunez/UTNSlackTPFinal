import {
    DropdownMenu,
    DropdownItem,
    DropdownDivider
} from "./DropdownMenu";
import "./WorkspaceInfoDropdown.css";

export function WorkspaceInfoDropdown({
    isOpen,
    position = "side-top",
    workspaceObj,
    workspaceInitials,
    onBackToWorkspaces
}) {
    const workspaceName = workspaceObj?.workspace_name || "Espacio de trabajo";
    const workspaceDescription =
        workspaceObj?.workspace_description || "Sin descripción disponible.";

    return (
        <DropdownMenu isOpen={isOpen} position={position}>
            <div className="workspace-info-dropdown-header">
                <div className="workspace-info-dropdown-avatar" aria-hidden="true">
                    <span>{workspaceInitials}</span>
                </div>
                <div className="workspace-info-dropdown-title-box">
                    <span className="workspace-info-dropdown-name">
                        {workspaceName}
                    </span>
                    <span className="workspace-info-dropdown-tag">
                        Espacio de trabajo activo
                    </span>
                </div>
            </div>

            <div className="workspace-info-dropdown-description-box">
              
                <p className="workspace-info-dropdown-description">
                    {workspaceDescription}
                </p>
            </div>

            <DropdownDivider />

            <DropdownItem onClick={onBackToWorkspaces}>
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
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                </svg>
                <span>Volver a espacios de trabajo</span>
            </DropdownItem>
        </DropdownMenu>
    );
}

export default WorkspaceInfoDropdown;
