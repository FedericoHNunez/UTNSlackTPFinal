import {
    DropdownMenu,
    DropdownItem,
    DropdownDivider
} from "./DropdownMenu";
import "./WorkspaceSettingsDropdown.css";

const ROLE_LABELS = {
    owner: "Owner",
    admin: "Admin",
    user: "Miembro"
};

export function WorkspaceSettingsDropdown({
    isOpen,
    userRole,
    canManageWorkspace,
    isOwner,
    onOpenInvite,
    onOpenEdit,
    onOpenDelete
}) {
    return (
        <DropdownMenu isOpen={isOpen} position="bottom-right">
            <div className="workspace-settings-dropdown-role">
                <span className="workspace-settings-dropdown-role-label">Privilegio:</span>
                <span
                    className={`workspace-settings-dropdown-role-badge workspace-settings-dropdown-role-badge--${
                        userRole || "user"
                    }`}
                >
                    {ROLE_LABELS[userRole] || userRole || "Miembro"}
                </span>
            </div>

            {canManageWorkspace && (
                <>
                    <DropdownDivider />
                    <DropdownItem onClick={onOpenInvite}>
                        Invitar nuevos miembros
                    </DropdownItem>
                    <DropdownItem onClick={onOpenEdit}>
                        Editar espacio de trabajo
                    </DropdownItem>
                </>
            )}

            {isOwner && (
                <>
                    <DropdownDivider />
                    <DropdownItem variant="danger" onClick={onOpenDelete}>
                        Eliminar espacio de trabajo
                    </DropdownItem>
                </>
            )}
        </DropdownMenu>
    );
}

export default WorkspaceSettingsDropdown;
