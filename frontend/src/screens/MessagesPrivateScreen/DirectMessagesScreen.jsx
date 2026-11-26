import { useContext, useEffect, useLayoutEffect, useRef } from "react";
import { useParams } from "react-router";
import TextareaAutosize from "react-textarea-autosize";
import { DirectMessagesContext } from "../../Context/DirectMessagesContext/DirectMessagesContext.jsx";
import { MembersContext } from "../../Context/MembersContext/MembersContext.jsx";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import { SpinnerLoading } from "../../Components/Ui/SpinnerLoading/SpinnerLoading.jsx";
import { RefreshButton } from "../../Components/Ui/RefreshButton/RefreshButton.jsx";
import { messageGrouper } from "../../hooks/useMessagesGrouper.js";
import { capitalizeFirstLetter } from "../../hooks/useCapitalize.js";
import useForm from "../../hooks/useForm.js";
import "../MessagesChannelScreen/MessagesChannelScreen.css";
import "../../Components/Channel/MessagesChannelHeader/MessagesChannelHeader.css";
import "../../Components/Channel/MessageList/MessageList.css";
import "../../Components/Forms/SendMessageForm/SendMessageForm.css";

export const DirectMessagesScreen = () => {
    const { user_id } = useParams();
    const {
        currentDirectMessages,
        get_direct_messages_loading,
        get_direct_messages_error,
        create_direct_message_response,
        create_direct_message_error,
        create_direct_message_loading,
        handleCreateDirectMessage,
        refreshDirectMessages
    } = useContext(DirectMessagesContext);
    const { currentWorkspaceMembers, refreshMembers } = useContext(MembersContext);
    const { refreshChannels } = useContext(ChannelContext);
    const { userData } = useContext(UserContext);
    const listRef = useRef(null);

    const { formState, handleChangeInput, resetForm } = useForm({ content: "" });

    const receiverMember = currentWorkspaceMembers?.find(
        (member) => member.id_user?._id === user_id
    );
    const receiverName = capitalizeFirstLetter(
        receiverMember?.id_user?.userName || "Usuario"
    );
    const receiverEmail = receiverMember?.id_user?.email || "";

    useEffect(() => {
        if (create_direct_message_response?.data?.newDirectMessage) {
            resetForm();
        }
    }, [create_direct_message_response]);

    useLayoutEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [currentDirectMessages, user_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.content.trim()) return;
        handleCreateDirectMessage(formState.content);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            if (!create_direct_message_loading && formState.content.trim()) {
                handleCreateDirectMessage(formState.content);
            }
        }
    };

    const groupedMessages = messageGrouper(currentDirectMessages);

    const handleRefreshDirectChat = () =>
        Promise.all([
            refreshDirectMessages?.(),
            refreshMembers?.(),
            refreshChannels?.()
        ]);

    return (
        <div className="mesages-channel-container">
            {get_direct_messages_loading ? (
                <SpinnerLoading
                    text="Cargando conversación privada..."
                    fullScreen={true}
                />
            ) : (
                <>
                    <header className="messages-channel-header">
                        <div className="messages-channel-header-info">
                            <h2 className="messages-channel-header-title">
                                <span
                                    className="members-list-status-dot"
                                    aria-hidden="true"
                                />
                                <span>{receiverName}</span>
                            </h2>
                            {receiverEmail && (
                                <>
                                    <span
                                        className="messages-channel-header-divider"
                                        aria-hidden="true"
                                    />
                                    <p
                                        className="messages-channel-header-description"
                                        title={receiverEmail}
                                    >
                                        {receiverEmail}
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="messages-channel-header-actions">
                            <RefreshButton
                                variant="light"
                                label="Actualizar"
                                onRefresh={handleRefreshDirectChat}
                                title="Actualizar mensajes directos"
                                ariaLabel="Actualizar mensajes directos"
                            />
                        </div>
                    </header>

                    <section
                        className="message-list"
                        ref={listRef}
                        aria-label="Lista de mensajes privados"
                    >
                        {get_direct_messages_error && (
                            <p className="form-alert form-alert-error" role="alert">
                                Error: {get_direct_messages_error}
                            </p>
                        )}

                        <div className="message-list-bubbles">
                            {groupedMessages?.map((group) => {
                                const isOwn = group.userName === userData?.userName;
                                const firstMsgDate = group.messages[0]?.createdAt
                                    ? new Date(
                                          group.messages[0].createdAt
                                      ).toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit"
                                      })
                                    : "";

                                return (
                                    <article
                                        key={group.id}
                                        className={`message-bubble ${
                                            isOwn
                                                ? "message-bubble--own"
                                                : "message-bubble--other"
                                        }`}
                                    >
                                        <div
                                            className="message-bubble-avatar"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                viewBox="0 0 36 36"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <rect
                                                    width="36"
                                                    height="36"
                                                    rx="8"
                                                    fill="#E8912D"
                                                />
                                                <circle
                                                    cx="18"
                                                    cy="14"
                                                    r="6"
                                                    fill="#FFF8EE"
                                                />
                                                <path
                                                    d="M6 34C6 27.3726 11.3726 22 18 22C24.6274 22 30 27.3726 30 34V36H6V34Z"
                                                    fill="#FFF8EE"
                                                />
                                            </svg>
                                        </div>

                                        <div className="message-bubble-body">
                                            <div className="message-bubble-meta">
                                                <span className="message-bubble-author">
                                                    {isOwn
                                                        ? `${group.userName} (Tú)`
                                                        : group.userName}
                                                </span>
                                                {firstMsgDate && (
                                                    <time className="message-bubble-time">
                                                        {firstMsgDate}
                                                    </time>
                                                )}
                                            </div>

                                            <div className="message-bubble-content">
                                                {group.messages.map((msg) => (
                                                    <p key={msg._id}>{msg.content}</p>
                                                ))}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    <form className="send-message-form" onSubmit={handleSubmit}>
                        {create_direct_message_error && !create_direct_message_loading && (
                            <div className="form-alert form-alert-error" role="alert">
                                {create_direct_message_error}
                            </div>
                        )}

                        <div className="send-message-box">
                            <TextareaAutosize
                                name="content"
                                id="direct-message-content"
                                className="send-message-input"
                                placeholder={`Enviar un mensaje a ${receiverName}...`}
                                value={formState.content}
                                onChange={handleChangeInput}
                                onKeyDown={handleKeyDown}
                                minRows={1}
                                maxRows={6}
                                disabled={create_direct_message_loading}
                                required
                            />

                            <button
                                type="submit"
                                className="send-message-btn"
                                disabled={
                                    create_direct_message_loading ||
                                    !formState.content.trim()
                                }
                                aria-label="Enviar mensaje directo"
                            >
                                {create_direct_message_loading
                                    ? "Enviando..."
                                    : "Enviar"}
                            </button>
                        </div>
                    </form>
                </>
            )}
        </div>
    );
};
