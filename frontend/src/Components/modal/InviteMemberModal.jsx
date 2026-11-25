import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useForm from "../../hooks/useForm.js";
import { MembersContext } from "../../Context/MembersContext/MembersContext.jsx";
import { Modal } from "./Modal.jsx";

export const InviteMemberModal = ({
    isOpen = false,
    onClose,
    workspaceName
}) => {
    const { workspace_id } = useParams();
    const {
        invite_member_response,
        invite_member_loading,
        invite_member_error,
        handleInviteMember
    } = useContext(MembersContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isButtonLocked, setIsButtonLocked] = useState(false);
    const submittingRef = useRef(false);
    const initial_form = { email: "", role: "user" };
    const { formState, handleChangeInput, resetForm } = useForm(initial_form);

    const handleClose = () => {
        submittingRef.current = false;
        setIsButtonLocked(false);
        setHasSubmitted(false);
        resetForm();
        if (onClose) onClose();
    };

    useEffect(() => {
        if (!isOpen) {
            submittingRef.current = false;
            setIsButtonLocked(false);
            setHasSubmitted(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (hasSubmitted && invite_member_error && !invite_member_loading) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [hasSubmitted, invite_member_error, invite_member_loading]);

    useEffect(() => {
        if (
            isOpen &&
            hasSubmitted &&
            invite_member_response &&
            !invite_member_loading &&
            !invite_member_error
        ) {
            const timer = setTimeout(() => {
                handleClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [
        isOpen,
        hasSubmitted,
        invite_member_response,
        invite_member_loading,
        invite_member_error
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submittingRef.current || isButtonLocked || invite_member_loading) return;
        if (!formState.email.trim()) return;
        submittingRef.current = true;
        setIsButtonLocked(true);
        setHasSubmitted(true);
        handleInviteMember(
            formState.email.trim(),
            formState.role,
            workspace_id
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={`Invitar miembros a ${workspaceName || "este espacio"}`}
        >
            <p className="modal-subtitle">
                Ingresa el correo electrónico de un usuario registrado y
                selecciona el rol que tendrá en el espacio de trabajo.
            </p>

            <form className="login-form" method="POST" onSubmit={handleSubmit}>
                <div className="login-field">
                    <label htmlFor="invite-member-email">
                        Correo electrónico
                    </label>
                    <input
                        type="email"
                        id="invite-member-email"
                        name="email"
                        placeholder="nombre@empresa.com"
                        value={formState.email}
                        onChange={handleChangeInput}
                        autocomplete="email"
                        autocorrect="off"
                        autocapitalize="none"
                        spellCheck="false"
                        required
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="invite-member-role">
                        Rol en el espacio de trabajo
                    </label>
                    <select
                        id="invite-member-role"
                        name="role"
                        value={formState.role}
                        onChange={handleChangeInput}
                    >
                        <option value="user">Miembro</option>
                        <option value="admin">Administrador</option>
                    </select>
                </div>

                {hasSubmitted && invite_member_error && !invite_member_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {invite_member_error}
                    </div>
                )}

                {hasSubmitted &&
                    invite_member_response &&
                    !invite_member_loading &&
                    !invite_member_error && (
                        <div
                            className="login-alert login-alert-success"
                            role="status"
                            aria-live="polite"
                        >
                            {invite_member_response.message ||
                                "Invitación enviada correctamente."}
                        </div>
                    )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={handleClose}
                        disabled={isButtonLocked || invite_member_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isButtonLocked || invite_member_loading}
                    >
                        {invite_member_loading
                            ? "Enviando..."
                            : "Enviar invitación"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default InviteMemberModal;
