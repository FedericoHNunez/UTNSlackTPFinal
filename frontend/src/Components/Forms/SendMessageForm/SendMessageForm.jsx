import { useContext, useEffect } from "react";
import useForm from "../../../hooks/useForm.js";
import { MessagesContext } from "../../../Context/MessagesContext/MessagesContext.jsx";
import "./SendMessageForm.css";

export const SendMessageForm = () => {
    const {
        handleCreateMessage,
        create_message_loading,
        create_message_error,
        create_message_response
    } = useContext(MessagesContext);

    const initial_form = { content: "" };
    const { formState, handleChangeInput, resetForm } = useForm(initial_form);

    useEffect(() => {
        if (create_message_response?.data?.message) {
            resetForm();
        }
    }, [create_message_response]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formState.content.trim()) return;
        handleCreateMessage(formState.content);
    };

    return (
        <form className="send-message-form" onSubmit={handleSubmit}>
            {create_message_error && !create_message_loading && (
                <div className="form-alert form-alert-error" role="alert">
                    {create_message_error}
                </div>
            )}

            <div className="send-message-box">
                <input
                    type="text"
                    name="content"
                    id="message-content"
                    className="send-message-input"
                    placeholder="Escribe un mensaje..."
                    value={formState.content}
                    onChange={handleChangeInput}
                    disabled={create_message_loading}
                    required
                />

                <button
                    type="submit"
                    className="send-message-btn"
                    disabled={create_message_loading || !formState.content.trim()}
                    aria-label="Enviar mensaje"
                >
                    {create_message_loading ? "Enviando..." : "Enviar"}
                </button>
            </div>
        </form>
    );
};

export default SendMessageForm;
