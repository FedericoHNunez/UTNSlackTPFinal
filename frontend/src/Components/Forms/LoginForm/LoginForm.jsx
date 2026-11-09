import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";
import useForm from "../../../hooks/useForm.js";
import useRequest from "../../../hooks/useRequest.js";
import { login, resendVerification } from "../../../services/authService.js";
import { UserContext } from "../../../Context/UserContext/UserContext.jsx";
import "./LoginForm.css";

export const LoginForm = () => {
    const navigate = useNavigate();
    const { setUserToken } = useContext(UserContext);

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
                            <p>¿Deseas enviar un nuevo mail de verificación?</p>
                            <button
                                type="button"
                                className="login-link login-link-btn"
                                disabled={resendLoading}
                                onClick={() =>
                                    sendResendRequest(() =>
                                        resendVerification(formState.email)
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

            <button
                className="login-submit-btn"
                type="submit"
                disabled={loading}
            >
                {loading ? "Cargando..." : "Iniciar sesión"}
            </button>

            {response && !loading && (
                <div className="login-alert login-alert-success">
                    Inicio de sesión exitoso
                </div>
            )}
        </form>
    );
};

export default LoginForm;

