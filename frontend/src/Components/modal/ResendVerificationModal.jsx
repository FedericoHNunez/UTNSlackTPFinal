import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";
import { resendVerification } from "../../services/authService.js";
import { Modal } from "./Modal.jsx";

export const ResendVerificationModal = ({ isOpen = true, onClose }) => {
    const initial_form = { email: "" };
    const { formState, handleChangeInput } = useForm(initial_form);
    const { loading, error, response, sendRequest } = useRequest();

    const onSubmit = (e) => {
        e.preventDefault();
        sendRequest(() => resendVerification(formState.email));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Enviar mail de validación"
        >
            <p className="modal-subtitle">
                Ingresa tu correo electrónico para enviarte un nuevo enlace de
                validación de cuenta.
            </p>

            <form className="login-form" onSubmit={onSubmit}>
                <div className="login-field">
                    <label htmlFor="resend-verification-email">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="resend-verification-email"
                        name="email"
                        placeholder="nombre@empresa.com"
                        value={formState.email}
                        onChange={handleChangeInput}
                        required
                    />
                </div>

                {error && !loading && (
                    <div className="login-alert login-alert-error">
                        {error === "User already verified."
                            ? "Usuario ya verificado."
                            : error}
                    </div>
                )}

                {response && !loading && (
                    <div className="login-alert login-alert-success">
                        {response.message ||
                            "Nuevo correo de verificación enviado."}
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

export default ResendVerificationModal;

