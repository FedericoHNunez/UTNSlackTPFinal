import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { Modal } from "./Modal.jsx";

export const DeleteWorkspaceModal = ({
    isOpen = false,
    onClose,
    workspaceName
}) => {
    const { workspace_id } = useParams();
    const navigate = useNavigate();
    const {
        delete_workspace_loading,
        delete_workspace_error,
        delete_workspace_response,
        handleDeleteWorkspace
    } = useContext(WorkspaceContext);

    useEffect(() => {
        if (isOpen && delete_workspace_response?.ok) {
            if (onClose) onClose();
            navigate("/workspaces");
        }
    }, [delete_workspace_response]);

    const handleConfirmDelete = (e) => {
        e.preventDefault();
        handleDeleteWorkspace(workspace_id);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Eliminar espacio de trabajo"
        >
            <p className="modal-subtitle">
                ¿Estás seguro de que deseas eliminar el espacio de trabajo{" "}
                <strong>{workspaceName}</strong>? Esta acción eliminará sus
                canales y mensajes de forma permanente.
            </p>

            <form
                className="login-form"
                method="POST"
                onSubmit={handleConfirmDelete}
            >
                {delete_workspace_error && !delete_workspace_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {delete_workspace_error}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={onClose}
                        disabled={delete_workspace_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn channel-header-delete-btn"
                        disabled={delete_workspace_loading}
                    >
                        {delete_workspace_loading
                            ? "Eliminando..."
                            : "Eliminar espacio"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default DeleteWorkspaceModal;
