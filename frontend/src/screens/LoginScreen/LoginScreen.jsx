import React, { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { login, resendVerification } from "../../services/authService.js";
import useRequest from "../../hooks/useRequest.js";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext/UserContext";
import { ForgotPasswordModal } from "../../modal/ForgotPasswordModal.jsx";
import "./LoginScreen.css";
import { SlackLogo } from "../../Components/Ui/SlackLogo"

/* 
Siguiendo las practicas implementadas la conectar el formulario de login con nuesta API REST
Desarrollar la implementacion del formulario de registro y la consulta a la API REST
*/

export const LoginScreen = () => {
    const navigate = useNavigate();

    const { setUserToken } = useContext(UserContext);
    const [showForgotModal, setShowForgotModal] = useState(false);
    const initial_state = { email: "", password: "" };
    const { formState, handleChangeInput } = useForm(initial_state);
    const { loading, response, error, errorCode, sendRequest } = useRequest();
    const {
        loading: resendLoading,
        response: resendResponse,
        error: resendError,
        sendRequest: sendResendRequest,
    } = useRequest();
    useEffect(() => {
        if (response) {
            setUserToken(response.data.auth_token);
            navigate("/workspaces");
        }
    }, [response]);

    async function handleSubmit(event) {
        event.preventDefault();
        await sendRequest(() => login(formState.email, formState.password));
    }

    return (
        <div className="login-page">
            <header className="login-header">
                <Link to="/" className="login-logo">
                    <div >
                        <SlackLogo />
                    </div>
                </Link>
                <h1>Primero, escribe tu correo</h1>
                <p className="login-subtitle">
                    Te sugerimos que uses la{" "}
                    <strong>
                        dirección de correo electrónico que usas en el trabajo
                    </strong>
                    .
                </p>
            </header>

            <main className="login-card">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="email">Correo electrónico</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            placeholder="nombre@empresa.com"
                            value={formState.email}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>
                    <div className="login-field">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            placeholder="Tu contraseña"
                            value={formState.password}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    {error && !loading && (
                        <div className="login-alert login-alert-error">
                            <p>{error}</p>
                            {errorCode === "EMAIL_NOT_VERIFIED" && (
                                <div className="login-resend-box">
                                    <p>
                                        ¿Deseas enviar un nuevo mail de
                                        verificación?
                                    </p>
                                    <button
                                        type="button"
                                        className="login-link login-link-btn"
                                        disabled={resendLoading}
                                        onClick={() =>
                                            sendResendRequest(() =>
                                                resendVerification(
                                                    formState.email,
                                                ),
                                            )
                                        }
                                    >
                                        {resendLoading
                                            ? "Reenviando..."
                                            : "Reenviar correo de verificación"}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {resendError && !resendLoading && (
                        <div className="login-alert login-alert-error">
                            {resendError}
                        </div>
                    )}

                    {resendResponse && !resendLoading && (
                        <div className="login-alert login-alert-success">
                            {resendResponse.message ||
                                "Nuevo correo de verificación enviado."}
                        </div>
                    )}

                    {loading ? (
                        <button
                            className="login-submit-btn"
                            type="submit"
                            disabled={true}
                        >
                            Cargando...
                        </button>
                    ) : (
                        <button className="login-submit-btn" type="submit">
                            Iniciar sesión
                        </button>
                    )}

                    {response && !loading && (
                        <div className="login-alert login-alert-success">
                            Inicio de sesión exitoso
                        </div>
                    )}
                </form>

                <div className="login-footer">
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
                </div>
            </main>

            {showForgotModal && (
                <ForgotPasswordModal
                    onClose={() => setShowForgotModal(false)}
                />
            )}
        </div>
    );
};

export default LoginScreen;
