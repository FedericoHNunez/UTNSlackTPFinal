import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { Modal } from "./Modal.jsx";

export const EditWorkspaceModal = ({
    isOpen = false,
    onClose,
    currentWorkspace
}) => {
    const { workspace_id } = useParams();
    const {
        edit_workspace_loading,
        edit_workspace_error,
        edit_workspace_response,
        handleEditWorkspace
    } = useContext(WorkspaceContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isButtonLocked, setIsButtonLocked] = useState(false);
    const submittingRef = useRef(false);
    const [formState, setFormState] = useState({
        name: "",
        description: ""
    });

    const handleClose = () => {
        submittingRef.current = false;
        setIsButtonLocked(false);
        setHasSubmitted(false);
        if (onClose) onClose();
    };

    useEffect(() => {
        if (isOpen && currentWorkspace) {
            submittingRef.current = false;
            setIsButtonLocked(false);
            setHasSubmitted(false);
            setFormState({
                name: currentWorkspace.workspace_name || "",
                description: currentWorkspace.workspace_description || ""
            });
        } else if (!isOpen) {
            submittingRef.current = false;
            setIsButtonLocked(false);
            setHasSubmitted(false);
        }
    }, [isOpen, currentWorkspace]);

    useEffect(() => {
        if (hasSubmitted && edit_workspace_error && !edit_workspace_loading) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [hasSubmitted, edit_workspace_error, edit_workspace_loading]);

    useEffect(() => {
        if (
            isOpen &&
            hasSubmitted &&
            edit_workspace_response?.data?.workspace &&
            !edit_workspace_loading &&
            !edit_workspace_error
        ) {
            const timer = setTimeout(() => {
                handleClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [
        isOpen,
        hasSubmitted,
        edit_workspace_response,
        edit_workspace_loading,
        edit_workspace_error
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submittingRef.current || isButtonLocked || edit_workspace_loading) return;
        if (!formState.name.trim() || !formState.description.trim()) return;
        submittingRef.current = true;
        setIsButtonLocked(true);
        setHasSubmitted(true);
        handleEditWorkspace(
            formState.name.trim(),
            formState.description.trim(),
            workspace_id
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Editar espacio de trabajo"
        >
            <p className="modal-subtitle">
                Actualiza el nombre y la descripción de tu espacio de trabajo.
            </p>

            <form className="login-form" method="POST" onSubmit={handleSubmit}>
                <div className="login-field">
                    <label htmlFor="edit-workspace-name">
                        Nombre del espacio de trabajo
                    </label>
                    <input
                        type="text"
                        id="edit-workspace-name"
                        name="name"
                        placeholder="p. ej. UTN Proyecto Final"
                        value={formState.name}
                        onChange={handleChange}
                        maxLength={30}
                        required
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="edit-workspace-description">
                        Descripción
                    </label>
                    <textarea
                        id="edit-workspace-description"
                        name="description"
                        placeholder="¿De qué trata este espacio de trabajo?"
                        value={formState.description}
                        onChange={handleChange}
                        maxLength={200}
                        required
                    />
                </div>

                {hasSubmitted && edit_workspace_error && !edit_workspace_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {edit_workspace_error}
                    </div>
                )}

                {hasSubmitted &&
                    edit_workspace_response?.data?.workspace &&
                    !edit_workspace_loading &&
                    !edit_workspace_error && (
                        <div
                            className="login-alert login-alert-success"
                            role="status"
                            aria-live="polite"
                        >
                            {edit_workspace_response.message ||
                                "Espacio de trabajo actualizado correctamente."}
                        </div>
                    )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={handleClose}
                        disabled={isButtonLocked || edit_workspace_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={isButtonLocked || edit_workspace_loading}
                    >
                        {edit_workspace_loading
                            ? "Guardando..."
                            : "Guardar cambios"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditWorkspaceModal;
