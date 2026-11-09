import { useContext, useEffect, useState } from "react";
import useForm from "../../hooks/useForm.js";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { Modal } from "./Modal.jsx";

export const CreateChannelModal = () => {
    const {
        create_channel_loading,
        create_channel_error,
        create_channel_response,
        handleCreateChannel
    } = useContext(ChannelContext);

    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const initial_form = { name: "", description: "" };
    const { formState, handleChangeInput } = useForm(initial_form);

    const handleOpenModal = () => setShowCreateChannelModal(true);
    const handleCloseModal = () => setShowCreateChannelModal(false);

    useEffect(() => {
        if (create_channel_response?.data?.channel) {
            handleCloseModal();
        }
    }, [create_channel_response]);

    const onSubmit = (e) => {
        e.preventDefault();
        handleCreateChannel(formState.name, formState.description);
    };

    return (
        <>
            <button type="button" onClick={handleOpenModal}>
                + Crear canal
            </button>

            <Modal
                isOpen={showCreateChannelModal}
                onClose={handleCloseModal}
                title="Crear un canal"
            >
                <p className="modal-subtitle">
                    Los canales son el lugar donde tu equipo se comunica. Son más
                    útiles cuando se organizan en torno a un tema, por ejemplo:{" "}
                    <strong>#marketing</strong>.
                </p>

                <form className="login-form" onSubmit={onSubmit}>
                    <div className="login-field">
                        <label htmlFor="channel-name">Nombre</label>
                        <input
                            type="text"
                            id="channel-name"
                            name="name"
                            placeholder="p. ej. plan-presupuesto"
                            value={formState.name}
                            onChange={handleChangeInput}
                            maxLength={50}
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor="channel-description">Descripción</label>
                        <input
                            type="text"
                            id="channel-description"
                            name="description"
                            placeholder="¿De qué trata este canal?"
                            value={formState.description}
                            onChange={handleChangeInput}
                            required
                        />
                    </div>

                    {create_channel_error && !create_channel_loading && (
                        <div className="login-alert login-alert-error">
                            {create_channel_error}
                        </div>
                    )}

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="modal-cancel-btn"
                            onClick={handleCloseModal}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="login-submit-btn"
                            disabled={create_channel_loading}
                        >
                            {create_channel_loading ? "Creando..." : "Crear"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default CreateChannelModal;
