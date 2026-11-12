import { useContext } from "react";
import { WorkspaceList } from "../../Components/WorkspaceList/WorkspaceList";
import { WorkspaceHeroHeader } from "../../Components/Workspace/WorkspaceHeroHeader";
import { WorkspaceInviteAside } from "../../Components/Workspace/WorkspaceInviteAside";
import SpinnerLoading from "../../Components/Ui/SpinnerLoading/SpinnerLoading";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext";
import Footer from "../../Components/Footer/Footer";
import "./WorkspaceScreen.css";

export const WorkspaceScreen = () => {
    const { workspace_loading } = useContext(WorkspaceContext);

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
            {/* div de fondo */}
            <div className="workspace-bg-arch" aria-hidden="true"></div>

            <WorkspaceHeroHeader />

            <main className="workspace-main-grid">
                <section className="workspace-list-column">
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
                </section>

                <WorkspaceInviteAside />
            </main>

            <Footer />
        </div>
    );
};

export default WorkspaceScreen;
