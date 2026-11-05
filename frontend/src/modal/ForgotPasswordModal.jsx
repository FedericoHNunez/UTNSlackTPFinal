import useForm from "../hooks/useForm.js";
import useRequest from "../hooks/useRequest.js";
import { resetPassword } from "../services/authService.js";

export const ForgotPasswordModal = ({ onClose }) => {
    const initial_form = { email: "" };
    const { formState, handleChangeInput } = useForm(initial_form);
    const { loading, error, response, sendRequest } = useRequest();

    const onSubmit = (e) => {
        e.preventDefault();
        sendRequest(() => resetPassword(formState.email));
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h2>Recuperar contraseña</h2>
                    <button
                        type="button"
                        className="modal-close-btn"
                        onClick={onClose}
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>

                <p className="modal-subtitle">
                    Ingresa tu correo electrónico y te enviaremos un enlace para
                    restablecer tu contraseña.
                </p>

                <form className="login-form" onSubmit={onSubmit}>
                    <div className="login-field">
                        <label htmlFor="reset-email">Correo electrónico</label>
                        <input
                            type="email"
                            id="reset-email"
                            name="email"
                            placeholder="nombre@empresa.com"
                            value={formState.email}
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
                            {response.message || "Correo de recuperación enviado."}
                        </div>
                    )}

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="modal-cancel-btn"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="login-submit-btn"
                            disabled={loading}
                        >
                            {loading ? "Enviando..." : "Enviar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

