import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { Modal } from "./Modal.jsx";

export const CreateWorkspaceModal = ({ isOpen = false, onClose }) => {
    const {
        create_workspace_loading,
        create_workspace_error,
        create_workspace_response,
        handleCreateWorkspace
    } = useContext(WorkspaceContext);

    const [step, setStep] = useState(1);
    const initial_form = { name: "", description: "" };
    const { formState, handleChangeInput, resetForm } = useForm(initial_form);

    const handleClose = () => {
        setStep(1);
        resetForm();
        if (onClose) onClose();
    };

    useEffect(() => {
        if (isOpen && create_workspace_response?.data?.workspace) {
            handleClose();
        }
    }, [create_workspace_response]);

    const handleNextStep = (e) => {
        e.preventDefault();
        if (!formState.name.trim()) return;
        setStep(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.name.trim() || !formState.description.trim()) return;
        handleCreateWorkspace(formState.name.trim(), formState.description.trim());
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Crear un espacio de trabajo"
        >
            <span className="modal-step-indicator">Paso {step} de 2</span>

            {step === 1 ? (
                <>
                    <p className="modal-subtitle">
                        ¿Cómo se llama tu empresa o equipo? Este será el nombre
                        de tu espacio de trabajo en Slack.
                    </p>

                    <form className="login-form" onSubmit={handleNextStep}>
                        <div className="login-field">
                            <label htmlFor="workspace-name">
                                Nombre del espacio de trabajo
                            </label>
                            <input
                                type="text"
                                id="workspace-name"
                                name="name"
                                placeholder="p. ej. UTN Proyecto Final"
                                value={formState.name}
                                onChange={handleChangeInput}
                                maxLength={30}
                                required
                            />
                        </div>

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="modal-cancel-btn"
                                onClick={handleClose}
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="login-submit-btn"
                                disabled={!formState.name.trim()}
                            >
                                Siguiente
                            </button>
                        </div>
                    </form>
                </>
            ) : (
                <>
                    <p className="modal-subtitle">
                        Agrega una breve descripción sobre qué trata el espacio
                        de trabajo <strong>{formState.name}</strong>.
                    </p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label htmlFor="workspace-description">
                                Descripción
                            </label>
                            <textarea
                                id="workspace-description"
                                name="description"
                                placeholder="¿De qué trata este espacio de trabajo?"
                                value={formState.description}
                                onChange={handleChangeInput}
                                maxLength={200}
                                required
                            />
                        </div>

                        {create_workspace_error && !create_workspace_loading && (
                            <div className="login-alert login-alert-error">
                                {create_workspace_error}
                            </div>
                        )}

                        <div className="modal-actions">
                            <button
                                type="button"
                                className="modal-cancel-btn"
                                onClick={() => setStep(1)}
                                disabled={create_workspace_loading}
                            >
                                Atrás
                            </button>
                            <button
                                type="submit"
                                className="login-submit-btn"
                                disabled={
                                    create_workspace_loading ||
                                    !formState.description.trim()
                                }
                            >
                                {create_workspace_loading
                                    ? "Creando..."
                                    : "Crear"}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </Modal>
    );
};

export default CreateWorkspaceModal;

