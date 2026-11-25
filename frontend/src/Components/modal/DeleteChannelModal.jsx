import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { Modal } from "./Modal.jsx";

export const DeleteChannelModal = ({
    isOpen = false,
    onClose,
    channelName
}) => {
    const { workspace_id, channel_id } = useParams();
    const navigate = useNavigate();
    const {
        delete_channel_loading,
        delete_channel_error,
        delete_channel_response,
        handleDeleteChannel
    } = useContext(ChannelContext);

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
        if (hasSubmitted && delete_channel_error && !delete_channel_loading) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [hasSubmitted, delete_channel_error, delete_channel_loading]);

    useEffect(() => {
        if (
            isOpen &&
            hasSubmitted &&
            delete_channel_response?.ok &&
            !delete_channel_loading &&
            !delete_channel_error
        ) {
            const timer = setTimeout(() => {
                handleClose();
                navigate(`/workspaces/${workspace_id}/channels`);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [
        isOpen,
        hasSubmitted,
        delete_channel_response,
        delete_channel_loading,
        delete_channel_error
    ]);

    const handleConfirmDelete = (e) => {
        e.preventDefault();
        if (submittingRef.current || isButtonLocked || delete_channel_loading) return;
        submittingRef.current = true;
        setIsButtonLocked(true);
        setHasSubmitted(true);
        handleDeleteChannel(channel_id, workspace_id);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Eliminar canal"
        >
            <p className="modal-subtitle">
                ¿Estás seguro de que deseas eliminar el canal{" "}
                <strong>#{channelName}</strong>? Esta acción eliminará el canal y
                todos sus mensajes de forma permanente.
            </p>

            <form
                className="login-form"
                method="POST"
                onSubmit={handleConfirmDelete}
            >
                {hasSubmitted && delete_channel_error && !delete_channel_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {delete_channel_error}
                    </div>
                )}

                {hasSubmitted &&
                    delete_channel_response?.ok &&
                    !delete_channel_loading &&
                    !delete_channel_error && (
                        <div
                            className="login-alert login-alert-success"
                            role="status"
                            aria-live="polite"
                        >
                            {delete_channel_response.message ||
                                "Canal eliminado correctamente."}
                        </div>
                    )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={handleClose}
                        disabled={isButtonLocked || delete_channel_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn channel-header-delete-btn"
                        disabled={isButtonLocked || delete_channel_loading}
                    >
                        {delete_channel_loading
                            ? "Eliminando..."
                            : "Eliminar canal"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default DeleteChannelModal;
