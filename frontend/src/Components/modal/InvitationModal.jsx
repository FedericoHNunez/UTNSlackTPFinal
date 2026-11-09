import { useContext } from "react";
import useForm from "../../hooks/useForm.js";
import { useInviteNewUser } from "../../hooks/useWorkspace.js";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import { Modal } from "./Modal.jsx";

export const InvitationModal = ({ isOpen = true, onClose }) => {
    const { userToken } = useContext(UserContext);
    const initial_form = { email: "" };
    const { formState, handleChangeInput } = useForm(initial_form);
    const {
        invite_new_user_loading,
        invite_new_user_error,
        invite_new_user_response,
        inviteNewUser
    } = useInviteNewUser();

    const onSubmit = (e) => {
        e.preventDefault();
        inviteNewUser(formState.email, userToken);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Invitar personas a unirse a Slack">
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
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={invite_new_user_loading}
                    >
                        {invite_new_user_loading ? "Enviando..." : "Enviar invitación"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default InvitationModal;
