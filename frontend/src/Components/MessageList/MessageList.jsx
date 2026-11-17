import { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { MessagesContext } from "../../Context/MessagesContext/MessagesContext.jsx";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { UserContext } from "../../Context/UserContext/UserContext.jsx";
import { messageGrouper } from "../../hooks/useMessagesGrouper.js";
import "./MessageList.css";

const CHANNEL_HEADER_CONFIG = {
    informal: {
        badge: "Social & Café",
        subtitle: "Un espacio distendido para charlar, compartir ideas y conectar con el equipo."
    },
    "nuevo-canal": {
        badge: "Bienvenida",
        subtitle: "Punto de partida para organizar las primeras tareas y objetivos del equipo."
    },
    "todo-ejemplo": {
        badge: "General",
        subtitle: "Espacio compartido con todos los miembros para anuncios y novedades."
    }
};

export const MessageList = () => {
    const { channel_id } = useParams();
    const { currentMessagesList, message_error } = useContext(MessagesContext);
    const { currentChannelList, setCurrentChannel_id } = useContext(ChannelContext);
    const { userData } = useContext(UserContext);
    const listRef = useRef(null);

    useEffect(() => {
        if (channel_id) {
            setCurrentChannel_id(channel_id);
        }
    }, [channel_id]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }, [currentMessagesList, channel_id]);

    const currentChannel = currentChannelList?.find(
        (channel) => channel.channel_id === channel_id
    );

    const channelName = currentChannel?.channel_name?.toLowerCase() || "";
    const channelVariant = CHANNEL_HEADER_CONFIG[channelName] ? channelName : "generic";
    const headerConfig = CHANNEL_HEADER_CONFIG[channelName] || {
        badge: "Canal de equipo",
        subtitle: "Espacio de conversación y colaboración para los miembros de este canal."
    };

    const messagesGroupe = messageGrouper(currentMessagesList);

    return (
        <section className="message-list" ref={listRef} aria-label="Lista de mensajes">
            <header className={`message-list-header message-list-header--${channelVariant}`}>
                <div className="message-list-header-top">
                    <span className="message-list-channel-pill">
                        #{currentChannel?.channel_name || "canal"}
                    </span>
                    <span className="message-list-channel-badge">
                        {headerConfig.badge}
                    </span>
                </div>

                <h1 className="message-list-header-title">
                    {currentChannel?.channel_description || `Canal #${currentChannel?.channel_name || ""}`}
                </h1>

                <p className="message-list-header-subtitle">
                    {headerConfig.subtitle}
                </p>
            </header>

            {message_error && (
                <p className="form-alert form-alert-error" role="alert">
                    Error: {message_error}
                </p>
            )}

            <div className="message-list-bubbles">
                {messagesGroupe?.map((group) => {
                    const isOwn = group.userName === userData?.userName;
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
                                        <p key={msg._id}>{msg.content}</p>
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