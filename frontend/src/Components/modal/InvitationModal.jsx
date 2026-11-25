import { useContext, useEffect, useRef, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { useInviteNewUser } from "../../hooks/fetch/useWorkspace.js";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import { Modal } from "./Modal.jsx";

export const InvitationModal = ({ isOpen = true, onClose }) => {
    const { userToken } = useContext(UserContext);
    const initial_form = { email: "" };
    const { formState, handleChangeInput, resetForm } = useForm(initial_form);
    const [isButtonLocked, setIsButtonLocked] = useState(false);
    const submittingRef = useRef(false);
    const {
        invite_new_user_loading,
        invite_new_user_error,
        invite_new_user_response,
        inviteNewUser
    } = useInviteNewUser();

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
        if (invite_new_user_error && !invite_new_user_loading) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [invite_new_user_error, invite_new_user_loading]);

    useEffect(() => {
        if (
            isOpen &&
            invite_new_user_response &&
            !invite_new_user_loading &&
            !invite_new_user_error
        ) {
            const timer = setTimeout(() => {
                handleClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [
        isOpen,
        invite_new_user_response,
        invite_new_user_loading,
        invite_new_user_error
    ]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (submittingRef.current || isButtonLocked || invite_new_user_loading) return;
        submittingRef.current = true;
        setIsButtonLocked(true);
        inviteNewUser(formState.email, userToken);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Invitar personas a unirse a Slack">
            <p className="modal-subtitle">
                Ingresa el correo electrónico de la persona que deseas invitar a unirse a nuestra plataforma.
            </p>

            <form className="login-form" onSubmit={onSubmit}>
                <div className="login-field">
                    <label htmlFor="invite-email">Correo electrónico</label>
                    <input
                        type="email"
                        id="invite-email"
                        name="email"
                        placeholder="nombre@empresa.com"
                        value={formState.email}
                        onChange={handleChangeInput}
                        required
                    />
                </div>

                {invite_new_user_error && !invite_new_user_loading && (
                    <div className="login-alert login-alert-error">
                        {invite_new_user_error}
                    </div>
                )}

                {invite_new_user_response && !invite_new_user_loading && (
                    <div className="login-alert login-alert-success">
                        {invite_new_user_response.message || "Invitación enviada correctamente."}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={handleClose}
                        disabled={isButtonLocked || invite_new_user_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isButtonLocked || invite_new_user_loading}
                    >
                        {invite_new_user_loading ? "Enviando..." : "Enviar invitación"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default InvitationModal;
