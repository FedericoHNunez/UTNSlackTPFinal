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

    const [formState, setFormState] = useState({
        name: "",
        description: ""
    });

    useEffect(() => {
        if (isOpen && currentChannel) {
            setFormState({
                name: currentChannel.channel_name || "",
                description: currentChannel.channel_description || ""
            });
        }
    }, [isOpen, currentChannel]);

    useEffect(() => {
        if (isOpen && edit_channel_response?.data?.channel) {
            if (onClose) onClose();
        }
    }, [edit_channel_response]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.name.trim() || !formState.description.trim()) return;
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
            onClose={onClose}
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

                {edit_channel_error && !edit_channel_loading && (
                    <div
                        className="login-alert login-alert-error"
                        role="status"
                        aria-live="polite"
                    >
                        {edit_channel_error}
                    </div>
                )}

                <div className="modal-actions">
                    <button
                        type="button"
                        className="modal-cancel-btn"
                        onClick={onClose}
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
