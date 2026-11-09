import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";
import { resetPassword } from "../../services/authService.js";
import { Modal } from "./Modal.jsx";

export const ForgotPasswordModal = ({ isOpen = true, onClose }) => {
    const initial_form = { email: "" };
    const { formState, handleChangeInput } = useForm(initial_form);
    const { loading, error, response, sendRequest } = useRequest();

    const onSubmit = (e) => {
        e.preventDefault();
        sendRequest(() => resetPassword(formState.email));
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Recuperar contraseña">
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
        </Modal>
    );
};
