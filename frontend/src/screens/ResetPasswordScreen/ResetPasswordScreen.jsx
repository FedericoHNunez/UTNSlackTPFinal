import { Link, useSearchParams } from "react-router";
import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";
import { changePassword } from "../../services/authService.js";
import "../LoginScreen/LoginScreen.css";

export const ResetPasswordScreen = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const initial_form = {
        newPassword: "",
        confirmNewPassword: "",
    };

    const { formState, handleChangeInput } = useForm(initial_form);
    const { loading, error, response, sendRequest } = useRequest();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendRequest(() =>
            changePassword(
                formState.newPassword,
                formState.confirmNewPassword,
                token,
            ),
        );
        if (response) {
            navigate("/login");
        }
    };

    return (
        <div className="login-page">
            <header className="login-header">
                <Link to="/" className="login-logo">
                    <div className="login-logo-icon">
                        <span className="login-dot login-dot-blue"></span>
                        <span className="login-dot login-dot-green"></span>
                        <span className="login-dot login-dot-red"></span>
                        <span className="login-dot login-dot-yellow"></span>
                    </div>
                    <span>slack</span>
                </Link>
                <h1>Restablecer contraseña</h1>
                <p className="login-subtitle">
                    Ingresa tu nueva contraseña para recuperar el acceso a tu
                    cuenta.
                </p>
            </header>

            <main className="login-card">
                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="login-field">
                        <label htmlFor="newPassword">Nueva contraseña</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="Tu nueva contraseña"
                            value={formState.newPassword}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="confirmNewPassword">
                            Confirmar nueva contraseña
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            placeholder="Repite tu nueva contraseña"
                            value={formState.confirmNewPassword}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    {error && !loading && (
                        <div className="login-alert login-alert-error">
                            {error}
                        </div>
                    )}

                    {response && !loading && (
                        <div className="login-alert login-alert-success">
                            {response.message ||
                                "Contraseña actualizada con éxito."}{" "}
                            <Link to="/login" className="login-link">
                                Iniciar sesión
                            </Link>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={loading}
                    >
                        {loading ? "Guardando..." : "Cambiar contraseña"}
                    </button>
                </form>

                <div className="login-footer">
                    <p>
                        ¿Recordaste tu contraseña?
                        <Link to="/login" className="login-link">
                            Volver a iniciar sesión
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default ResetPasswordScreen;
