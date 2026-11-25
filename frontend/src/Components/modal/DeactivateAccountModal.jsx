import { useContext, useEffect, useRef, useState } from "react";
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

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isButtonLocked, setIsButtonLocked] = useState(false);
    const submittingRef = useRef(false);

    const handleClose = () => {
        submittingRef.current = false;
        setIsButtonLocked(false);
        setHasSubmitted(false);
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
        if (hasSubmitted && delete_user_error && !delete_user_loading) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [hasSubmitted, delete_user_error, delete_user_loading]);

    useEffect(() => {
        if (
            isOpen &&
            hasSubmitted &&
            delete_user_response?.ok &&
            !delete_user_loading &&
            !delete_user_error
        ) {
            const timer = setTimeout(() => {
                handleClose();
                if (typeof onDeactivated === "function") {
                    onDeactivated();
                }
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [
        isOpen,
        hasSubmitted,
        delete_user_response,
        delete_user_loading,
        delete_user_error
    ]);

    const handleConfirmDeactivate = (e) => {
        e.preventDefault();
        if (submittingRef.current || isButtonLocked || delete_user_loading) return;
        submittingRef.current = true;
        setIsButtonLocked(true);
        setHasSubmitted(true);
        handleDeleteUser();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
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
                {hasSubmitted && delete_user_error && !delete_user_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {delete_user_error}
                    </div>
                )}

                {hasSubmitted &&
                    delete_user_response?.ok &&
                    !delete_user_loading &&
                    !delete_user_error && (
                        <div
                            className="login-alert login-alert-success"
                            role="status"
                            aria-live="polite"
                        >
                            {delete_user_response.message ||
                                "Cuenta desactivada correctamente."}
                        </div>
                    )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={handleClose}
                        disabled={isButtonLocked || delete_user_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn channel-header-delete-btn"
                        disabled={isButtonLocked || delete_user_loading}
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
