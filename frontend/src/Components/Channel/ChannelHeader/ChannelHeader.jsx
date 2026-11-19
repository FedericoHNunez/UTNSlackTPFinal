import { useContext, useState } from "react";
import { useParams } from "react-router";
import { WorkspaceContext } from "../../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { ChannelContext } from "../../../Context/ChannelContext/ChannelContext.jsx";
import { SearchForm } from "../../Forms/SearchForm/SearchForm.jsx";
import { InviteMemberModal } from "../../modal/InviteMemberModal.jsx";
import { EditWorkspaceModal } from "../../modal/EditWorkspaceModal.jsx";
import { DeleteWorkspaceModal } from "../../modal/DeleteWorkspaceModal.jsx";
import { WorkspaceSettingsDropdown } from "../../Dropdown/WorkspaceSettingsDropdown.jsx";
import { useDropdown } from "../../../hooks/useDropdown.js";
import "./ChannelHeader.css";

export const ChannelHeader = () => {
    const { workspace_id } = useParams();
    const { currentWorkspaceList } = useContext(WorkspaceContext);
    const { searchValue, setSearchValue } = useContext(ChannelContext);

    const {
        isOpen: isMenuOpen,
        toggle: toggleMenu,
        close: closeMenu,
        dropdownRef: menuRef
    } = useDropdown();

    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const currentWorkspace = currentWorkspaceList?.find(
        (workspace) => workspace.workspace_id === workspace_id
    );

    const userRole = currentWorkspace?.workspace_role;
    const isOwner = userRole === "owner";
    const isAdmin = userRole === "admin";
    const canManageWorkspace = isOwner || isAdmin;

    const handleOpenInviteModal = () => {
        closeMenu();
        setIsInviteModalOpen(true);
    };

    const handleOpenEditModal = () => {
        closeMenu();
        setIsEditModalOpen(true);
    };

    const handleOpenDeleteModal = () => {
        closeMenu();
        setIsDeleteModalOpen(true);
    };

    return (
        <header className="channel-header">
            <div className="channel-header-top">
                <h4 className="channel-header-title">
                    {currentWorkspace?.workspace_name || "Cargando..."}
                </h4>

                <div className="channel-header-settings" ref={menuRef}>
                    <button
                        type="button"
                        className="channel-header-settings-btn"
                        aria-label="Configuración del espacio de trabajo"
                        aria-expanded={isMenuOpen}
                        onClick={toggleMenu}
                    >
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                        </svg>
                    </button>

                    <WorkspaceSettingsDropdown
                        isOpen={isMenuOpen}
                        userRole={userRole}
                        canManageWorkspace={canManageWorkspace}
                        isOwner={isOwner}
                        onOpenInvite={handleOpenInviteModal}
                        onOpenEdit={handleOpenEditModal}
                        onOpenDelete={handleOpenDeleteModal}
                    />
                </div>
            </div>

            <SearchForm
                placeholder="Buscar un canal"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />

            <InviteMemberModal
                isOpen={isInviteModalOpen}
                onClose={() => setIsInviteModalOpen(false)}
                workspaceName={currentWorkspace?.workspace_name}
            />

            <EditWorkspaceModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentWorkspace={currentWorkspace}
            />

            <DeleteWorkspaceModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                workspaceName={currentWorkspace?.workspace_name}
            />
        </header>
    );
};
