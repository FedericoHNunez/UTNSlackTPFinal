import { formatConversationDate } from "../../constants/dateConstants.js";
import "./WorkspaceSearchDropdown.css";

function HighlightMatch({ text = "", query = "" }) {
    const cleanText = String(text);
    const trimmed = query.trim();
    if (!trimmed || !cleanText) {
        return <>{cleanText}</>;
    }

    const escaped = trimmed.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escaped})`, "gi");
    const parts = cleanText.split(regex);

    return (
        <>
            {parts.map((part, idx) =>
                part.toLowerCase() === trimmed.toLowerCase() ? (
                    <mark key={idx} className="workspace-search-mark">
                        {part}
                    </mark>
                ) : (
                    <span key={idx}>{part}</span>
                )
            )}
        </>
    );
}

const FILTER_TABS = [
    { id: "all", label: "Todo" },
    { id: "channels", label: "Canales" },
    { id: "members", label: "Personas" },
    { id: "messages", label: "Mensajes" }
];

export function WorkspaceSearchDropdown({
    isOpen,
    workspaceName,
    query,
    activeTab,
    onChangeTab,
    channels = [],
    members = [],
    messages = [],
    totalCount = 0,
    isSearchingMessages = false,
    searchError = null,
    onSelectChannel,
    onSelectMember,
    onSelectMessage
}) {
    const trimmedQuery = query.trim();

    const tabCounts = {
        all: totalCount,
        channels: channels.length,
        members: members.length,
        messages: messages.length
    };

    const showChannels =
        (activeTab === "all" || activeTab === "channels") && channels.length > 0;
    const showMembers =
        (activeTab === "all" || activeTab === "members") && members.length > 0;
    const showMessages =
        (activeTab === "all" || activeTab === "messages") &&
        (messages.length > 0 || isSearchingMessages);

    const hasVisibleResults = showChannels || showMembers || showMessages;

    return (
        <div
            className={`workspace-search-dropdown ${isOpen ? "is-open" : ""}`.trim()}
            role="region"
            aria-label="Resultados de búsqueda"
            aria-hidden={!isOpen}
        >
            {!trimmedQuery ? (
                <div className="workspace-search-hint">
                    <p className="workspace-search-hint-title">
                        Buscar en {workspaceName}
                    </p>
                    <p className="workspace-search-hint-text">
                        Encontrá rápidamente canales, miembros o mensajes enviados en
                        canales y chats directos.
                    </p>
                    <div className="workspace-search-shortcuts">
                        <span className="workspace-search-kbd">Ctrl + K</span>
                        <span>para abrir</span>
                        <span className="workspace-search-dot">•</span>
                        <span className="workspace-search-kbd">Enter</span>
                        <span>ir al primero</span>
                        <span className="workspace-search-dot">•</span>
                        <span className="workspace-search-kbd">Esc</span>
                        <span>cerrar</span>
                    </div>
                </div>
            ) : (
                <>
                    <div
                        className="workspace-search-tabs"
                        role="tablist"
                        aria-label="Filtrar resultados"
                    >
                        {FILTER_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                type="button"
                                role="tab"
                                aria-selected={activeTab === tab.id}
                                className={`workspace-search-tab ${
                                    activeTab === tab.id ? "is-active" : ""
                                }`.trim()}
                                onClick={() => onChangeTab(tab.id)}
                            >
                                <span>{tab.label}</span>
                                <span className="workspace-search-tab-count">
                                    {tab.id === "messages" && isSearchingMessages
                                        ? "…"
                                        : tabCounts[tab.id]}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="workspace-search-results">
                        {searchError && (
                            <p className="workspace-search-error" role="alert">
                                {searchError}
                            </p>
                        )}

                        {showChannels && (
                            <div className="workspace-search-section">
                                <span className="workspace-search-section-title">
                                    Canales
                                </span>
                                {channels.map((ch) => (
                                    <button
                                        key={ch.channel_id}
                                        type="button"
                                        className="workspace-search-item"
                                        onClick={() => onSelectChannel(ch.channel_id)}
                                    >
                                        <span
                                            className="workspace-search-icon workspace-search-icon--channel"
                                            aria-hidden="true"
                                        >
                                            #
                                        </span>
                                        <span className="workspace-search-item-body">
                                            <span className="workspace-search-item-title">
                                                <HighlightMatch
                                                    text={ch.channel_name}
                                                    query={trimmedQuery}
                                                />
                                            </span>
                                            {ch.channel_description && (
                                                <span className="workspace-search-item-sub">
                                                    <HighlightMatch
                                                        text={ch.channel_description}
                                                        query={trimmedQuery}
                                                    />
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {showMembers && (
                            <div className="workspace-search-section">
                                <span className="workspace-search-section-title">
                                    Personas
                                </span>
                                {members.map((member) => (
                                    <button
                                        key={member.user_id}
                                        type="button"
                                        className="workspace-search-item"
                                        onClick={() => onSelectMember(member.user_id)}
                                    >
                                        <span
                                            className="workspace-search-icon workspace-search-icon--member"
                                            aria-hidden="true"
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                                <circle cx="12" cy="7" r="4" />
                                            </svg>
                                        </span>
                                        <span className="workspace-search-item-body">
                                            <span className="workspace-search-item-title">
                                                <HighlightMatch
                                                    text={member.userName}
                                                    query={trimmedQuery}
                                                />
                                                {member.isSelf && (
                                                    <span className="workspace-search-self-tag">
                                                        (Tú)
                                                    </span>
                                                )}
                                            </span>
                                            {member.email && (
                                                <span className="workspace-search-item-sub">
                                                    <HighlightMatch
                                                        text={member.email}
                                                        query={trimmedQuery}
                                                    />
                                                </span>
                                            )}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {showMessages && (
                            <div className="workspace-search-section">
                                <div className="workspace-search-section-header">
                                    <span className="workspace-search-section-title">
                                        Mensajes
                                    </span>
                                    {isSearchingMessages && (
                                        <span className="workspace-search-loading">
                                            Buscando…
                                        </span>
                                    )}
                                </div>

                                {messages.map((msg) => (
                                    <button
                                        key={msg.id}
                                        type="button"
                                        className="workspace-search-item workspace-search-item--message"
                                        onClick={() => onSelectMessage(msg)}
                                    >
                                        <span
                                            className={`workspace-search-icon ${
                                                msg.kind === "direct-message"
                                                    ? "workspace-search-icon--member"
                                                    : "workspace-search-icon--message"
                                            }`}
                                            aria-hidden="true"
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            >
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                            </svg>
                                        </span>
                                        <span className="workspace-search-item-body">
                                            <span className="workspace-search-msg-meta">
                                                <span className="workspace-search-msg-context">
                                                    {msg.contextLabel}
                                                </span>
                                                <span className="workspace-search-dot">
                                                    •
                                                </span>
                                                <span className="workspace-search-msg-author">
                                                    {msg.authorName}
                                                </span>
                                                {msg.createdAt && (
                                                    <span className="workspace-search-msg-date">
                                                        {formatConversationDate(
                                                            msg.createdAt
                                                        )}
                                                    </span>
                                                )}
                                            </span>
                                            <span className="workspace-search-msg-snippet">
                                                <HighlightMatch
                                                    text={msg.content}
                                                    query={trimmedQuery}
                                                />
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}

                        {!hasVisibleResults && !isSearchingMessages && (
                            <div className="workspace-search-empty">
                                <p className="workspace-search-empty-title">
                                    Sin coincidencias para “{trimmedQuery}”
                                </p>
                                <p className="workspace-search-empty-sub">
                                    Probá con otra palabra clave o cambiá el filtro de
                                    categoría.
                                </p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default WorkspaceSearchDropdown;
