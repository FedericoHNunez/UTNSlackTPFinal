import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import { Modal } from "./Modal.jsx";

export const DeactivateAccountModal = ({
    isOpen = false,
    onClose,
    userName,
    onDeactivated
}) => {
    const {
        delete_user_loading,
        delete_user_error,
        delete_user_response,
        handleDeleteUser
    } = useContext(UserContext);

    useEffect(() => {
        if (isOpen && delete_user_response?.ok) {
            if (onClose) onClose();
            if (typeof onDeactivated === "function") {
                onDeactivated();
            }
        }
    }, [delete_user_response]);

    const handleConfirmDeactivate = (e) => {
        e.preventDefault();
        handleDeleteUser();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Desactivar cuenta"
        >
            <p className="modal-subtitle">
                ¿Estás seguro de que deseas desactivar tu cuenta
                {userName ? (
                    <>
                        {" "}
                        (<strong>{userName}</strong>)
                    </>
                ) : null}
                ? Una vez desactivada, tu sesión se cerrará y no podrás volver a
                iniciar sesión con esta cuenta.
            </p>

            <form
                className="login-form"
                method="POST"
                onSubmit={handleConfirmDeactivate}
            >
                {delete_user_error && !delete_user_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {delete_user_error}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={onClose}
                        disabled={delete_user_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn channel-header-delete-btn"
                        disabled={delete_user_loading}
                    >
                        {delete_user_loading
                            ? "Desactivando..."
                            : "Desactivar cuenta"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default DeactivateAccountModal;
