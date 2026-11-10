import { useContext, useState } from "react";
import { Link } from "react-router";
import { WorkspaceList } from "../../Components/WorkspaceList/WorkspaceList";
import SpinnerLoading from "../../Components/Ui/SpinnerLoading/SpinnerLoading";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext";
import { SlackLogo } from "../../Components/Ui/SlackLogo";
import InvitationModal from "../../Components/modal/InvitationModal";
import "./WorkspaceScreen.css";

export const WorkspaceScreen = () => {
    const { workspace_loading } = useContext(WorkspaceContext);
    const [showInvitationModal, setShowInvitationModal] = useState(false);

    if (workspace_loading) {
        return (
            <SpinnerLoading
                fullScreen={true}
                text="Cargando espacios de trabajo..."
            />
        );
    }

    return (
        <div className="workspace-screen-container">
            <div className="workspace-bg-arch" aria-hidden="true"></div>

            <header className="workspace-top-bar">
                <Link to="/" className="workspace-logo-link">
                    <SlackLogo color="white" />
                </Link>
            </header>

            <section className="workspace-hero-header">
                <h1>
                    ¡Hola otra vez!{" "}
                    <span className="workspace-wave" role="img" aria-label="saludo">
                        👋
                    </span>
                </h1>
                <p>Elige un espacio de trabajo para empezar.</p>
            </section>

            <main className="workspace-main-grid">
                <div className="workspace-list-column">
                    <div className="workspace-section-label">
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
                            <rect x="3" y="3" width="7" height="7" rx="1.5" />
                            <rect x="14" y="3" width="7" height="7" rx="1.5" />
                            <rect x="3" y="14" width="7" height="7" rx="1.5" />
                            <rect x="14" y="14" width="7" height="7" rx="1.5" />
                        </svg>
                        <span>Mis espacios de trabajo</span>
                    </div>

                    <WorkspaceList />
                </div>

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
            </main>

            {showInvitationModal && (
                <InvitationModal
                    onClose={() => setShowInvitationModal(false)}
                />
            )}
        </div>
    );
};

export default WorkspaceScreen;
