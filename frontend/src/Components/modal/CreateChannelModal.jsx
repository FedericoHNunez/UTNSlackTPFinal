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
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const initial_form = { name: "", description: "" };
    const { formState, handleChangeInput, resetForm } = useForm(initial_form);

    const handleOpenModal = () => {
        setHasSubmitted(false);
        setShowCreateChannelModal(true);
    };
    const handleCloseModal = () => {
        setHasSubmitted(false);
        resetForm();
        setShowCreateChannelModal(false);
    };

    useEffect(() => {
        if (
            showCreateChannelModal &&
            hasSubmitted &&
            create_channel_response?.data?.channel &&
            !create_channel_loading &&
            !create_channel_error
        ) {
            const timer = setTimeout(() => {
                handleCloseModal();
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [
        showCreateChannelModal,
        hasSubmitted,
        create_channel_response,
        create_channel_loading,
        create_channel_error
    ]);

    const onSubmit = (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        handleCreateChannel(formState.name, formState.description);
    };

    return (
        <>
            <button
                type="button"
                className="channel-list-create-btn"
                onClick={handleOpenModal}
            >
                <span className="channel-list-create-icon" aria-hidden="true">
                    +
                </span>
                <span>Crear canal</span>
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

                    {hasSubmitted && create_channel_error && !create_channel_loading && (
                        <div className="login-alert login-alert-error">
                            {create_channel_error}
                        </div>
                    )}

                    {hasSubmitted &&
                        create_channel_response?.data?.channel &&
                        !create_channel_loading &&
                        !create_channel_error && (
                            <div className="login-alert login-alert-success">
                                {create_channel_response.message ||
                                    "Canal creado correctamente."}
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
