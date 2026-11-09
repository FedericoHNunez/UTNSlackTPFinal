import { Link } from "react-router";
import useRequest from "../../../hooks/useRequest.js";
import useForm from "../../../hooks/useForm.js";
import { register } from "../../../services/authService.js";
import "./RegisterForm.css";

export const RegisterForm = () => {
    const initial_state = { email: "", password: "", userName: "" };
    const { formState, handleChangeInput } = useForm(initial_state);
    const { loading, response, error, errorCode, sendRequest } = useRequest();

    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest(() =>
            register(formState.email, formState.password, formState.userName)
        );
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <div className="register-field">
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

            <div className="register-field">
                <label htmlFor="userName">Nombre de usuario</label>
                <input
                    name="userName"
                    id="userName"
                    type="text"
                    placeholder="Tu nombre o apodo"
                    maxLength={50}
                    value={formState.userName}
                    onChange={handleChangeInput}
                    required
                />
            </div>

            <div className="register-field">
                <label htmlFor="password">Contraseña</label>
                <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Crea una contraseña"
                    value={formState.password}
                    onChange={handleChangeInput}
                    required
                />
            </div>

            {error && !loading && (
                <div className="register-alert register-alert-error">
                    <p>{error}</p>
                    {errorCode === "ALREADY_EXISTS" && (
                        <div className="register-existing-box">
                            <span>Usuario ya registrado.</span>
                            <Link to="/login" className="register-link">
                                Iniciar sesión
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {response && !loading && (
                <div className="register-alert register-alert-success">
                    {response.message || "Registro exitoso. Revisa tu correo para verificar tu cuenta."}
                </div>
            )}

            <button
                type="submit"
                className="register-submit-btn"
                disabled={loading}
            >
                {loading ? "Enviando..." : "Crear cuenta"}
            </button>
        </form>
    );
};

export default RegisterForm;

