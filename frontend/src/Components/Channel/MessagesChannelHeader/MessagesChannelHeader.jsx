import { useContext, useState } from "react";
import { useParams } from "react-router";
import { ChannelContext } from "../../../Context/ChannelContext/ChannelContext.jsx";
import { WorkspaceContext } from "../../../Context/WorkspaceContext/WorkspaceContext.jsx";
import {
    DropdownMenu,
    DropdownItem,
    DropdownDivider
} from "../../Dropdown/DropdownMenu.jsx";
import { EditChannelModal } from "../../modal/EditChannelModal.jsx";
import { DeleteChannelModal } from "../../modal/DeleteChannelModal.jsx";
import { useDropdown } from "../../../hooks/useDropdown.js";
import "./MessagesChannelHeader.css";

const ROLE_LABELS = {
    owner: "Owner",
    admin: "Admin",
    user: "Miembro"
};

export const MessagesChannelHeader = () => {
    const { workspace_id, channel_id } = useParams();
    const { currentChannelList } = useContext(ChannelContext);
    const { currentWorkspaceList } = useContext(WorkspaceContext);

    const {
        isOpen: isMenuOpen,
        toggle: toggleMenu,
        close: closeMenu,
        dropdownRef: menuRef
    } = useDropdown();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const currentChannel = currentChannelList?.find(
        (channel) => channel.channel_id === channel_id
    );

    const currentWorkspace = currentWorkspaceList?.find(
        (workspace) => workspace.workspace_id === workspace_id
    );

    const userRole = currentWorkspace?.workspace_role;
    const isOwner = userRole === "owner";
    const isAdmin = userRole === "admin";
    const canEditChannel = isOwner || isAdmin;

    const handleOpenEditModal = () => {
        closeMenu();
        setIsEditModalOpen(true);
    };

    const handleOpenDeleteModal = () => {
        closeMenu();
        setIsDeleteModalOpen(true);
    };

    return (
        <header className="messages-channel-header">
            <div className="messages-channel-header-info">
                <h2 className="messages-channel-header-title">
                    <span className="messages-channel-header-hash" aria-hidden="true">
                        #
                    </span>
                    <span>{currentChannel?.channel_name || "canal"}</span>
                </h2>
            </div>

            <div className="messages-channel-header-actions" ref={menuRef}>
                <button
                    type="button"
                    className="messages-channel-header-menu-btn"
                    aria-label="Opciones del canal"
                    aria-expanded={isMenuOpen}
                    onClick={toggleMenu}
                >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                    </svg>
                </button>

                <DropdownMenu isOpen={isMenuOpen} position="bottom-right">
                    <div className="workspace-settings-dropdown-role">
                        <span className="workspace-settings-dropdown-role-label">
                            Privilegio:
                        </span>
                        <span
                            className={`workspace-settings-dropdown-role-badge workspace-settings-dropdown-role-badge--${
                                userRole || "user"
                            }`}
                        >
                            {ROLE_LABELS[userRole] || userRole || "Miembro"}
                        </span>
                    </div>

                    {canEditChannel && (
                        <>
                            <DropdownDivider />
                            <DropdownItem onClick={handleOpenEditModal}>
                                Editar canal
                            </DropdownItem>
                        </>
                    )}

                    {isOwner && (
                        <>
                            <DropdownDivider />
                            <DropdownItem
                                variant="danger"
                                onClick={handleOpenDeleteModal}
                            >
                                Borrar canal
                            </DropdownItem>
                        </>
                    )}
                </DropdownMenu>
            </div>

            <EditChannelModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                currentChannel={currentChannel}
            />

            <DeleteChannelModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                channelName={currentChannel?.channel_name}
            />
        </header>
    );
};

export default MessagesChannelHeader;
