import { Link } from "react-router";
import { SlackLogo } from "../Ui/SlackLogo";
import { UserProfileMenu } from "../Dropdown/UserProfileMenu";
import "./WorkspaceHeroHeader.css";

export const WorkspaceHeroHeader = () => {
    return (
        <>
            <header className="workspace-top-bar">
                <div className="workspace-top-bar-spacer" aria-hidden="true" />
                <Link to="/" className="workspace-logo-link">
                    <SlackLogo color="white" />
                </Link>
                <div className="workspace-top-bar-actions">
                    <UserProfileMenu position="bottom-right" size="md" />
                </div>
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
        </>
    );
};

export default WorkspaceHeroHeader;

