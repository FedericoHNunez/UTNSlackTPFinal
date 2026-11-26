import { useContext, useState } from "react";
import { Link, useParams } from "react-router";
import { DirectMessagesContext } from "../../Context/DirectMessagesContext/DirectMessagesContext.jsx";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { MembersContext } from "../../Context/MembersContext/MembersContext.jsx";
import { SearchForm } from "../Forms/SearchForm/SearchForm.jsx";
import { SpinnerLoading } from "../Ui/SpinnerLoading/SpinnerLoading.jsx";
import { RefreshButton } from "../Ui/RefreshButton/RefreshButton.jsx";
import { getAvatarColor } from "../../constants/avatarConstants.js";
import { formatConversationDate } from "../../constants/dateConstants.js";
import { capitalizeFirstLetter } from "../../hooks/useCapitalize.js";
import "./DirectMessagesList.css";

export const ConversationList = () => {
    const { workspace_id, user_id } = useParams();
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const {
        currentDirectConversations,
        get_conversations_loading,
        get_conversations_error,
        refreshConversations
    } = useContext(DirectMessagesContext);
    const { refreshMembers } = useContext(MembersContext);

    const [searchValue, setSearchValue] = useState("");

    const activeWorkspaceId = workspace_id || currentWorkspace_id;
    const conversations = Array.isArray(currentDirectConversations)
        ? currentDirectConversations
        : [];

    const filteredConversations = conversations.filter((conversation) => {
        const query = searchValue.trim().toLowerCase();
        if (!query) return true;

        const userName = conversation.contact?.userName?.toLowerCase() || "";
        const email = conversation.contact?.email?.toLowerCase() || "";
        const lastMessage = conversation.lastMessage?.toLowerCase() || "";

        return (
            userName.includes(query) ||
            email.includes(query) ||
            lastMessage.includes(query)
        );
    });

    if (get_conversations_loading) {
        return (
            <SpinnerLoading
                text="Cargando conversaciones..."
                fullScreen={true}
                variant="dark"
            />
        );
    }

    return (
        <div className="dm-list-container">
            <header className="dm-list-header">
                <div className="dm-list-header-top">
                    <h4 className="dm-list-header-title">Mensajes directos</h4>
                    <div className="dm-list-header-actions">
                        <RefreshButton
                            variant="dark"
                            onRefresh={() =>
                                Promise.all([
                                    refreshConversations?.(),
                                    refreshMembers?.()
                                ])
                            }
                            title="Actualizar conversaciones"
                            ariaLabel="Actualizar conversaciones"
                        />
                    </div>
                </div>

                <SearchForm
                    placeholder="Buscar conversación..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            </header>

            <section
                className="dm-list-section"
                aria-label="Conversaciones directas"
            >
                <h5 className="dm-list-subtitle">Conversaciones</h5>

                {get_conversations_error && (
                    <p className="dm-list-error" role="alert">
                        Error: {get_conversations_error}
                    </p>
                )}

                {filteredConversations.length > 0 ? (
                    <ul className="dm-list-items">
                        {filteredConversations.map((conversation, index) => {
                            const contact = conversation.contact || {};
                            const contactId = contact._id;
                            const displayName = capitalizeFirstLetter(
                                contact.userName || "Usuario"
                            );
                            const avatarColor = getAvatarColor(
                                contactId || contact.userName,
                                index
                            );
                            const isActive =
                                Boolean(contactId) && contactId === user_id;
                            const formattedDate = formatConversationDate(
                                conversation.lastMessageAt
                            );
                            const fullDateTitle = conversation.lastMessageAt
                                ? new Date(
                                      conversation.lastMessageAt
                                  ).toLocaleString()
                                : "";

                            return (
                                <li
                                    key={contactId || contact.email}
                                    className="dm-list-item"
                                >
                                    <Link
                                        to={`/workspaces/${activeWorkspaceId}/MessagesPrivate/${contactId}/messages`}
                                        className={`dm-list-link ${
                                            isActive ? "is-active" : ""
                                        }`}
                                        title={
                                            contact.email
                                                ? `${displayName} (${contact.email})`
                                                : displayName
                                        }
                                    >
                                        <div
                                            className="dm-list-avatar"
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
                                                    fill={avatarColor}
                                                />
                                                <circle
                                                    cx="18"
                                                    cy="13.5"
                                                    r="6"
                                                    fill="#FFFFFF"
                                                />
                                                <path
                                                    d="M6 34C6 27.3726 11.3726 22 18 22C24.6274 22 30 27.3726 30 34V36H6V34Z"
                                                    fill="#FFFFFF"
                                                />
                                            </svg>
                                            <span className="dm-list-status-dot" />
                                        </div>

                                        <div className="dm-list-body">
                                            <div className="dm-list-top-row">
                                                <span className="dm-list-username">
                                                    {displayName}
                                                </span>
                                                {formattedDate && (
                                                    <time
                                                        className="dm-list-time"
                                                        dateTime={
                                                            conversation.lastMessageAt
                                                        }
                                                        title={fullDateTitle}
                                                    >
                                                        {formattedDate}
                                                    </time>
                                                )}
                                            </div>

                                            <p className="dm-list-last-message">
                                                {conversation.lastMessage ||
                                                    "Sin mensajes aún"}
                                            </p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="dm-list-empty">
                        <p className="dm-list-empty-title">
                            {searchValue.trim()
                                ? "Sin resultados"
                                : "No hay conversaciones aún"}
                        </p>
                        <p className="dm-list-empty-text">
                            {searchValue.trim()
                                ? "Probá buscando con otro nombre o mensaje."
                                : "Iniciá un chat privado con cualquier miembro desde la lista de canales."}
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default ConversationList;
