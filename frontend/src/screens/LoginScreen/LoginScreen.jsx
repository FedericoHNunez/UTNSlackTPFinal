import { useState } from "react";
import { Link } from "react-router";
import { SlackLogo } from "../../Components/Ui/SlackLogo.jsx";
import { LoginForm } from "../../Components/Forms/LoginForm/LoginForm.jsx";
import { ForgotPasswordModal } from "../../Components/modal/ForgotPasswordModal.jsx";
import { ReactivateAccountModal } from "../../Components/modal/ReactivateAccountModal.jsx";
import { Footer } from "../../Components/Ui/Footer/Footer.jsx";
import "./LoginScreen.css";

export const LoginScreen = () => {
    const [showForgotModal, setShowForgotModal] = useState(false);
    const [showReactivateModal, setShowReactivateModal] = useState(false);

    return (
        <div className="login-page">
            <header className="login-header">
                <Link to="/" className="login-logo">
                    <SlackLogo color="black" />
                </Link>
                <h1>Iniciar sesión</h1>
                <p className="login-subtitle">
                    Te sugerimos que uses la{" "}
                    <strong>
                        dirección de correo electrónico que usas en el trabajo
                    </strong>
                    .
                </p>
            </header>

            <main className="login-card">
                <LoginForm />

                <footer className="login-footer">
                    <p>
                        ¿Nuevo en Slack?
                        <Link to="/register" className="login-link">
                            Crear una cuenta
                        </Link>
                    </p>
                    <p>
                        ¿Olvidaste tu contraseña?
                        <button
                            type="button"
                            className="login-link login-link-btn"
                            onClick={() => setShowForgotModal(true)}
                        >
                            Recuperar contraseña
                        </button>
                    </p>
                    <p>
                        ¿Desactivaste tu cuenta?
                        <button
                            type="button"
                            className="login-link login-link-btn"
                            onClick={() => setShowReactivateModal(true)}
                        >
                            Reactivar cuenta
                        </button>
                    </p>
                </footer>
            </main>

            <Footer />

            {showForgotModal && (
                <ForgotPasswordModal
                    onClose={() => setShowForgotModal(false)}
                />
            )}

            {showReactivateModal && (
                <ReactivateAccountModal
                    onClose={() => setShowReactivateModal(false)}
                />
            )}
        </div>
    );
};

export default LoginScreen;
