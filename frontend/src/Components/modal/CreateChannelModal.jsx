import { useContext, useEffect, useId, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useForm from "../../hooks/useForm.js";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { Modal } from "./Modal.jsx";

export const CreateChannelModal = ({
    triggerClassName = "channel-list-create-btn",
    iconClassName = "channel-list-create-icon",
    label = "Crear canal"
}) => {
    const {
        create_channel_loading,
        create_channel_error,
        create_channel_response,
        handleCreateChannel
    } = useContext(ChannelContext);

    const { workspace_id } = useParams();
    const navigate = useNavigate();
    const fieldId = useId();
    const nameInputId = `channel-name-${fieldId}`;
    const descInputId = `channel-description-${fieldId}`;

    const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isButtonLocked, setIsButtonLocked] = useState(false);
    const submittingRef = useRef(false);
    const initial_form = { name: "", description: "" };
    const { formState, handleChangeInput, resetForm } = useForm(initial_form);

    const handleOpenModal = () => {
        submittingRef.current = false;
        setIsButtonLocked(false);
        setHasSubmitted(false);
        setShowCreateChannelModal(true);
    };
    const handleCloseModal = () => {
        submittingRef.current = false;
        setIsButtonLocked(false);
        setHasSubmitted(false);
        resetForm();
        setShowCreateChannelModal(false);
    };

    useEffect(() => {
        if (hasSubmitted && create_channel_error && !create_channel_loading) {
            submittingRef.current = false;
            setIsButtonLocked(false);
        }
    }, [hasSubmitted, create_channel_error, create_channel_loading]);

    useEffect(() => {
        const createdChannel = create_channel_response?.data?.channel;
        if (
            showCreateChannelModal &&
            hasSubmitted &&
            createdChannel &&
            !create_channel_loading &&
            !create_channel_error
        ) {
            const newChannelId = createdChannel._id || createdChannel.channel_id;
            const timer = setTimeout(() => {
                handleCloseModal();
                if (workspace_id && newChannelId) {
                    navigate(`/workspaces/${workspace_id}/channels/${newChannelId}/messages`);
                }
            }, 1200);
            return () => clearTimeout(timer);
        }
    }, [
        showCreateChannelModal,
        hasSubmitted,
        create_channel_response,
        create_channel_loading,
        create_channel_error,
        workspace_id,
        navigate
    ]);

    const onSubmit = (e) => {
        e.preventDefault();
        if (submittingRef.current || isButtonLocked || create_channel_loading) return;
        submittingRef.current = true;
        setIsButtonLocked(true);
        setHasSubmitted(true);
        handleCreateChannel(formState.name, formState.description);
    };

    return (
        <>
            <button
                type="button"
                className={triggerClassName}
                onClick={handleOpenModal}
            >
                <span className={iconClassName} aria-hidden="true">
                    +
                </span>
                <span>{label}</span>
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
                        <label htmlFor={nameInputId}>Nombre</label>
                        <input
                            type="text"
                            id={nameInputId}
                            name="name"
                            placeholder="p. ej. plan-presupuesto"
                            value={formState.name}
                            onChange={handleChangeInput}
                            maxLength={50}
                            required
                        />
                    </div>

                    <div className="login-field">
                        <label htmlFor={descInputId}>Descripción</label>
                        <input
                            type="text"
                            id={descInputId}
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
                            disabled={isButtonLocked || create_channel_loading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="login-submit-btn"
                            disabled={isButtonLocked || create_channel_loading}
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
