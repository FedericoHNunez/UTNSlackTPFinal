import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { MessagesContext } from "../../../Context/MessagesContext/MessagesContext.jsx";
import { ChannelContext } from "../../../Context/ChannelContext/ChannelContext.jsx";
import { UserContext } from "../../../Context/UserContext/UserContext.jsx";
import { messageGrouper } from "../../../hooks/useMessagesGrouper.js";
import { useMessageEditor } from "../../../hooks/useMessageEditor.js";
import { useAutoScrollMessages } from "../../../hooks/useAutoScrollMessages.js";
import { MessageItem } from "./MessageItem.jsx";
import "./MessageList.css";

export const MessageList = () => {
    const { channel_id } = useParams();
    const {
        currentMessagesList,
        get_message_error,
        edit_message_response,
        edit_message_error,
        edit_message_loading,
        handleEditMessage,
        delete_message_response,
        delete_message_error,
        delete_message_loading,
        handleDeleteMessage
    } = useContext(MessagesContext);
    const { setCurrentChannel_id } = useContext(ChannelContext);
    const { userData } = useContext(UserContext);

    const listRef = useAutoScrollMessages(currentMessagesList, channel_id);

    const editor = useMessageEditor({
        onSave: handleEditMessage,
        editResponse: edit_message_response,
        editLoading: edit_message_loading,
        editError: edit_message_error,
        onDelete: handleDeleteMessage,
        deleteResponse: delete_message_response,
        deleteLoading: delete_message_loading,
        deleteError: delete_message_error,
        resetKey: channel_id
    });

    useEffect(() => {
        if (channel_id) {
            setCurrentChannel_id(channel_id);
        }
    }, [channel_id]);

    const messagesGroupe = messageGrouper(currentMessagesList);

    return (
        <section className="message-list" ref={listRef} aria-label="Lista de mensajes">
            {get_message_error && (
                <p className="form-alert form-alert-error" role="alert">
                    Error: {get_message_error}
                </p>
            )}

            <div className="message-list-bubbles">
                {messagesGroupe?.map((group) => {
                    const isOwn = Boolean(
                        userData?.userName && group.userName === userData.userName
                    );
                    const firstMsgDate = group.messages[0]?.createdAt
                        ? new Date(group.messages[0].createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit"
                          })
                        : "";

                    return (
                        <article
                            key={group.id}
                            className={`message-bubble ${isOwn ? "message-bubble--own" : "message-bubble--other"}`}
                        >
                            <div className="message-bubble-avatar" aria-hidden="true">
                                <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="36" height="36" rx="8" fill="#E8912D" />
                                    <circle cx="18" cy="14" r="6" fill="#FFF8EE" />
                                    <path
                                        d="M6 34C6 27.3726 11.3726 22 18 22C24.6274 22 30 27.3726 30 34V36H6V34Z"
                                        fill="#FFF8EE"
                                    />
                                </svg>
                            </div>

                            <div className="message-bubble-body">
                                <div className="message-bubble-meta">
                                    <span className="message-bubble-author">
                                        {isOwn ? `${group.userName} (Tú)` : group.userName}
                                    </span>
                                    {firstMsgDate && (
                                        <time className="message-bubble-time">
                                            {firstMsgDate}
                                        </time>
                                    )}
                                </div>

                                <div className="message-bubble-content">
                                    {group.messages.map((msg) => (
                                        <MessageItem
                                            key={msg._id}
                                            msg={msg}
                                            isOwn={isOwn}
                                            editor={editor}
                                        />
                                    ))}
                                </div>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>
    );
};