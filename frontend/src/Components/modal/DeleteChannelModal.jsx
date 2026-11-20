import { useContext, useEffect } from "react";
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

    useEffect(() => {
        if (isOpen && delete_channel_response?.ok) {
            if (onClose) onClose();
            navigate(`/workspaces/${workspace_id}/channels`);
        }
    }, [delete_channel_response]);

    const handleConfirmDelete = (e) => {
        e.preventDefault();
        handleDeleteChannel(channel_id, workspace_id);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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
                {delete_channel_error && !delete_channel_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {delete_channel_error}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={onClose}
                        disabled={delete_channel_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn channel-header-delete-btn"
                        disabled={delete_channel_loading}
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
