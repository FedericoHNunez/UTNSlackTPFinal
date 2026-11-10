import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useForm from "../../../hooks/useForm.js";
import useRequest from "../../../hooks/useRequest.js";
import { login } from "../../../services/authService.js";
import { UserContext } from "../../../Context/UserContext/UserContext.jsx";
import { ResendVerificationModal } from "../../modal/ResendVerificationModal.jsx";
import "./LoginForm.css";

export const LoginForm = () => {
    const navigate = useNavigate();
    const { setUserToken } = useContext(UserContext);
    const [showResendModal, setShowResendModal] = useState(false);

    const initial_state = { email: "", password: "" };
    const { formState, handleChangeInput } = useForm(initial_state);
    const { loading, response, error, errorCode, sendRequest } = useRequest();

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
        <>
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
                                <p>¿Deseas enviar un nuevo mail de validación?</p>
                                <button
                                    type="button"
                                    className="login-link login-link-btn"
                                    onClick={() => setShowResendModal(true)}
                                >
                                    Enviar mail de validación
                                </button>
                            </div>
                        )}
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

            {showResendModal && (
                <ResendVerificationModal
                    onClose={() => setShowResendModal(false)}
                />
            )}
        </>
    );
};

export default LoginForm;

