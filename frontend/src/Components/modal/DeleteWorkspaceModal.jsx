import { useContext, useEffect, useRef, useState } from "react";
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
        if (hasSubmitted && delete_workspace_error && !delete_workspace_loading) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [hasSubmitted, delete_workspace_error, delete_workspace_loading]);

    useEffect(() => {
        if (
            isOpen &&
            hasSubmitted &&
            delete_workspace_response?.ok &&
            !delete_workspace_loading &&
            !delete_workspace_error
        ) {
            const timer = setTimeout(() => {
                handleClose();
                navigate("/workspaces");
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [
        isOpen,
        hasSubmitted,
        delete_workspace_response,
        delete_workspace_loading,
        delete_workspace_error
    ]);

    const handleConfirmDelete = (e) => {
        e.preventDefault();
        if (submittingRef.current || isButtonLocked || delete_workspace_loading) return;
        submittingRef.current = true;
        setIsButtonLocked(true);
        setHasSubmitted(true);
        handleDeleteWorkspace(workspace_id);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
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
                {hasSubmitted && delete_workspace_error && !delete_workspace_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {delete_workspace_error}
                    </div>
                )}

                {hasSubmitted &&
                    delete_workspace_response?.ok &&
                    !delete_workspace_loading &&
                    !delete_workspace_error && (
                        <div
                            className="login-alert login-alert-success"
                            role="status"
                            aria-live="polite"
                        >
                            {delete_workspace_response.message ||
                                "Espacio de trabajo eliminado correctamente."}
                        </div>
                    )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={handleClose}
                        disabled={isButtonLocked || delete_workspace_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn channel-header-delete-btn"
                        disabled={isButtonLocked || delete_workspace_loading}
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
