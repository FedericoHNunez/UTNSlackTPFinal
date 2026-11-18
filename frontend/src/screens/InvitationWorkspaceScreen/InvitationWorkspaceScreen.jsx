import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useAcceptWorkspaceInvite } from "../../hooks/fetch/useMembers.js";
import { SlackLogo } from "../../Components/Ui/SlackLogo.jsx";
import SpinnerLoading from "../../Components/Ui/SpinnerLoading/SpinnerLoading.jsx";
import "./InvitationWorkspaceScreen.css";

export const InvitationWorkspaceScreen = () => {
    const { workspace_id, token } = useParams();
    const navigate = useNavigate();

    const {
        accept_invite_response,
        accept_invite_loading,
        accept_invite_error
    } = useAcceptWorkspaceInvite(workspace_id, token);

    const isAlreadyMember =
        accept_invite_error === "Ya eres miembro de este espacio de trabajo.";

    useEffect(() => {
        document.title = accept_invite_response
            ? "Invitación confirmada | Slack"
            : accept_invite_error
            ? "Error en la invitación | Slack"
            : "Confirmando invitación | Slack";
    }, [accept_invite_response, accept_invite_error]);

    useEffect(() => {
        if (accept_invite_response) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [accept_invite_response, navigate]);

    return (
        <div className="invitation-page">
            <header className="invitation-header">
                <Link to="/" className="invitation-logo">
                    <SlackLogo color="black" />
                </Link>
            </header>

            <main className="invitation-card">
                {accept_invite_loading && (
                    <div className="invitation-state">
                        <SpinnerLoading text="Confirmando invitación al espacio de trabajo..." />
                    </div>
                )}

                {!accept_invite_loading && accept_invite_response && (
                    <div
                        className="invitation-state"
                        role="status"
                        aria-live="polite"
                    >
                        <span className="invitation-badge">
                            Espacio de trabajo
                        </span>

                        <div
                            className="invitation-icon invitation-icon-success"
                            aria-hidden="true"
                        >
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>

                        <h1>¡Te has unido al espacio de trabajo!</h1>
                        <p className="invitation-subtitle">
                            {accept_invite_response.message ||
                                "Tu invitación fue confirmada con éxito."}{" "}
                            Serás redirigido al inicio de sesión en 3
                            segundos...
                        </p>

                        <Link
                            to="/login"
                            className="form-submit-btn invitation-btn"
                        >
                            Ir a iniciar sesión
                        </Link>
                    </div>
                )}

                {!accept_invite_loading && accept_invite_error && (
                    <div className="invitation-state" role="alert">
                        <span className="invitation-badge">
                            Espacio de trabajo
                        </span>

                        <div
                            className="invitation-icon invitation-icon-error"
                            aria-hidden="true"
                        >
                            <svg
                                width="36"
                                height="36"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>

                        <h1>
                            {isAlreadyMember
                                ? "Ya eres miembro de este espacio"
                                : "No pudimos confirmar tu invitación"}
                        </h1>

                        <div className="form-alert form-alert-error invitation-alert">
                            <p>{accept_invite_error}</p>
                        </div>

                        <Link
                            to="/login"
                            className="form-submit-btn invitation-btn"
                        >
                            Ir a iniciar sesión
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default InvitationWorkspaceScreen;
