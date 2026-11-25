import { useEffect, useRef, useState } from "react";
import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/fetch/useRequest.js";
import { requestReactivateAccount } from "../../services/authService.js";
import { Modal } from "./Modal.jsx";

export const ReactivateAccountModal = ({
    isOpen = true,
    onClose,
    initialEmail = ""
}) => {
    const initial_form = { email: initialEmail };
    const { formState, handleChangeInput, resetForm } = useForm(initial_form);
    const { loading, error, response, sendRequest } = useRequest();
    const [isButtonLocked, setIsButtonLocked] = useState(false);
    const submittingRef = useRef(false);

    const handleClose = () => {
        submittingRef.current = false;
        setIsButtonLocked(false);
        resetForm();
        if (onClose) onClose();
    };

    useEffect(() => {
        if (!isOpen) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (error && !loading) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [error, loading]);

    useEffect(() => {
        if (isOpen && response && !loading && !error) {
            const timer = setTimeout(() => {
                handleClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [isOpen, response, loading, error]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (submittingRef.current || isButtonLocked || loading) return;
        submittingRef.current = true;
        setIsButtonLocked(true);
        sendRequest(() => requestReactivateAccount(formState.email));
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Reactivar cuenta"
        >
            <p className="modal-subtitle">
                Ingresa el correo electrónico de tu cuenta desactivada y te
                enviaremos un enlace para volver a activarla.
            </p>

            <form className="login-form" onSubmit={onSubmit}>
                <div className="login-field">
                    <label htmlFor="reactivate-account-email">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="reactivate-account-email"
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
                        {response.message ||
                            "Se ha enviado un correo con el enlace para reactivar tu cuenta."}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={handleClose}
                        disabled={isButtonLocked || loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isButtonLocked || loading}
                    >
                        {loading ? "Enviando..." : "Enviar enlace"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default ReactivateAccountModal;
