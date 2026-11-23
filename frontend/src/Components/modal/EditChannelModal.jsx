import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { Modal } from "./Modal.jsx";

export const EditChannelModal = ({
    isOpen = false,
    onClose,
    currentChannel
}) => {
    const { workspace_id, channel_id } = useParams();
    const {
        edit_channel_loading,
        edit_channel_error,
        edit_channel_response,
        handleEditChannel
    } = useContext(ChannelContext);

    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [formState, setFormState] = useState({
        name: "",
        description: ""
    });

    const handleClose = () => {
        setHasSubmitted(false);
        if (onClose) onClose();
    };

    useEffect(() => {
        if (isOpen && currentChannel) {
            setHasSubmitted(false);
            setFormState({
                name: currentChannel.channel_name || "",
                description: currentChannel.channel_description || ""
            });
        } else if (!isOpen) {
            setHasSubmitted(false);
        }
    }, [isOpen, currentChannel]);

    useEffect(() => {
        if (
            isOpen &&
            hasSubmitted &&
            edit_channel_response?.data?.channel &&
            !edit_channel_loading &&
            !edit_channel_error
        ) {
            const timer = setTimeout(() => {
                handleClose();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [
        isOpen,
        hasSubmitted,
        edit_channel_response,
        edit_channel_loading,
        edit_channel_error
    ]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.name.trim() || !formState.description.trim()) return;
        setHasSubmitted(true);
        handleEditChannel(
            formState.name.trim(),
            formState.description.trim(),
            channel_id,
            workspace_id
        );
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title="Editar canal"
        >
            <p className="modal-subtitle">
                Actualiza el nombre y la descripción de este canal.
            </p>

            <form className="login-form" method="POST" onSubmit={handleSubmit}>
                <div className="login-field">
                    <label htmlFor="edit-channel-name">
                        Nombre del canal
                    </label>
                    <input
                        type="text"
                        id="edit-channel-name"
                        name="name"
                        placeholder="p. ej. diseño"
                        value={formState.name}
                        onChange={handleChange}
                        maxLength={50}
                        required
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="edit-channel-description">
                        Descripción
                    </label>
                    <textarea
                        id="edit-channel-description"
                        name="description"
                        placeholder="¿De qué trata este canal?"
                        value={formState.description}
                        onChange={handleChange}
                        maxLength={1000}
                        required
                    />
                </div>

                {hasSubmitted && edit_channel_error && !edit_channel_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {edit_channel_error}
                    </div>
                )}

                {hasSubmitted &&
                    edit_channel_response?.data?.channel &&
                    !edit_channel_loading &&
                    !edit_channel_error && (
                        <div
                            className="login-alert login-alert-success"
                            role="status"
                            aria-live="polite"
                        >
                            {edit_channel_response.message ||
                                "Canal actualizado correctamente."}
                        </div>
                    )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={handleClose}
                        disabled={edit_channel_loading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="login-submit-btn"
                        disabled={edit_channel_loading}
                    >
                        {edit_channel_loading
                            ? "Guardando..."
                            : "Guardar cambios"}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default EditChannelModal;
