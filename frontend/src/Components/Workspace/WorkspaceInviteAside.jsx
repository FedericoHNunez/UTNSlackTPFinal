import { useState } from "react";
import InvitationModal from "../modal/InvitationModal";
import "./WorkspaceInviteAside.css";

export const WorkspaceInviteAside = () => {
    const [showInvitationModal, setShowInvitationModal] = useState(false);

    return (
        <>
            <aside className="workspace-invite-column">
                <div className="workspace-section-label">
                    <span className="workspace-mini-badge" aria-hidden="true"></span>
                    <span>UTN SLACK</span>
                </div>

                <div className="workspace-invite-card">
                    <div className="workspace-invite-content">
                        <h3>Invitar a socios externos.</h3>
                        <p>Agiliza el trabajo con los equipos externos</p>
                        <button
                            type="button"
                            className="workspace-invite-btn"
                            onClick={() => setShowInvitationModal(true)}
                        >
                            Invitar socios
                        </button>
                    </div>

                    <div className="workspace-invite-icon" aria-hidden="true">
                        <svg
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                        </svg>
                    </div>
                </div>
            </aside>

            {showInvitationModal && (
                <InvitationModal
                    onClose={() => setShowInvitationModal(false)}
                />
            )}
        </>
    );
};

export default WorkspaceInviteAside;

