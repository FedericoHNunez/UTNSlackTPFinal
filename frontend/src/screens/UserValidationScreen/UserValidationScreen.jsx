import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import useRequest from "../../hooks/useRequest.js";
import { validateUser } from "../../services/authService.js";
import { SlackLogo } from "../../Components/Ui/SlackLogo.jsx";
import SpinnerLoading from "../../Components/Ui/SpinnerLoading/SpinnerLoading.jsx";
import "./UserValidationScreen.css";

export const UserValidationScreen = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const { loading, error, response, sendRequest } = useRequest();

    useEffect(() => {
        if (token) {
            sendRequest(() => validateUser(token));
        }
    }, []);

    useEffect(() => {
        if (response) {
            const timer = setTimeout(() => {
                navigate("/login");
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [response, navigate]);

    return (
        <div className="validation-page">
            <header className="validation-header">
                <Link to="/" className="validation-logo">
                    <SlackLogo color="black" />
                </Link>
            </header>

            <main className="validation-card">
                {loading && (
                    <div className="validation-state">
                        <SpinnerLoading text="Validando usuario..." />
                    </div>
                )}

                {!loading && response && (
                    <div className="validation-state">
                        <div
                            className="validation-icon validation-icon-success"
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

                        <h1>Tu usuario ha sido validado correctamente</h1>
                        <p className="validation-subtitle">
                            Tu correo electrónico fue confirmado con éxito.
                            Serás redirigido al inicio de sesión en 3
                            segundos...
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="validation-state">
                        <div
                            className="validation-icon validation-icon-error"
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

                        <h1>No pudimos validar tu cuenta</h1>
                        <div className="form-alert form-alert-error validation-alert">
                            <p>{error}</p>
                        </div>

                        <Link
                            to="/login"
                            className="form-submit-btn validation-btn"
                        >
                            Ir a iniciar sesión
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
};

export default UserValidationScreen;
