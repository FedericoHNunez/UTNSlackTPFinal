import { useContext, useEffect, useState } from "react";
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

    const [formState, setFormState] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        if (isOpen && currentWorkspace) {
            setFormState({
                name: currentWorkspace.workspace_name || "",
                description: currentWorkspace.workspace_description || ""
            });
        }
    }, [isOpen, currentWorkspace]);

    useEffect(() => {
        if (isOpen && edit_workspace_response?.data?.workspace) {
            if (onClose) onClose();
        }
    }, [edit_workspace_response]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.name.trim() || !formState.description.trim()) return;
        handleEditWorkspace(
            formState.name.trim(),
            formState.description.trim(),
            workspace_id
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
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

                {edit_workspace_error && !edit_workspace_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {edit_workspace_error}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={onClose}
                        disabled={edit_workspace_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={edit_workspace_loading}
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
