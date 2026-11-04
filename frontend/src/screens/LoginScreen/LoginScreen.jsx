import React, { useContext, useEffect } from "react";
import useForm from "../../hooks/useForm.js";
import { login } from "../../services/authService.js";
import useRequest from "../../hooks/useRequest.js";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../Context/UserContext";
import "./LoginScreen.css";

/* 
Siguiendo las practicas implementadas la conectar el formulario de login con nuesta API REST
Desarrollar la implementacion del formulario de registro y la consulta a la API REST
*/

export const LoginScreen = () => {
    const { setUserToken } = useContext(UserContext);

    const initial_state = { email: "", password: "" };
    const { formState, handleChangeInput } = useForm(initial_state);
    const { loading, response, error, sendRequest } = useRequest();
    const navigate = useNavigate();

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
                    <div className="login-logo-icon">
                        <span className="login-dot login-dot-blue"></span>
                        <span className="login-dot login-dot-green"></span>
                        <span className="login-dot login-dot-red"></span>
                        <span className="login-dot login-dot-yellow"></span>
                    </div>
                    <span>slack</span>
                </Link>
                <h1>Iniciar sesión en Slack</h1>
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
                            {error}
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
                        <Link to="/forgot-password" className="login-link">
                            Recuperar contraseña
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default LoginScreen;
