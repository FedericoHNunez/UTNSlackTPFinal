import TextareaAutosize from "react-textarea-autosize";
import { isMessageEdited } from "../../../hooks/useMessageEditor.js";

export const MessageItem = ({ msg, isOwn, editor }) => {
    const {
        activeActionMessageId,
        toggleMessageActions,
        editingMessageId,
        editContent,
        setEditContent,
        hasSubmittedEdit,
        startEditing,
        cancelEditing,
        submitEdit,
        handleEditKeyDown,
        editLoading,
        editError,
        canDelete,
        confirmingDeleteId,
        hasSubmittedDelete,
        requestDeleteConfirm,
        cancelDeleteConfirm,
        confirmDelete,
        deleteLoading,
        deleteError
    } = editor;

    const isDeleted = msg?.active === false;

    if (isDeleted) {
        return (
            <div className="message-item message-item--deleted">
                <p className="message-item-deleted-text">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                    </svg>
                    <span>Este mensaje fue eliminado</span>
                </p>
            </div>
        );
    }

    const isEditingThis = editingMessageId === msg._id;
    const isConfirmingDelete = confirmingDeleteId === msg._id;
    const isActionsOpen = activeActionMessageId === msg._id || isConfirmingDelete;
    const edited = isMessageEdited(msg);

    if (isEditingThis) {
        return (
            <form
                className="message-edit-form"
                onSubmit={(e) => {
                    e.preventDefault();
                    submitEdit(msg);
                }}
            >
                <div className="message-edit-box">
                    <TextareaAutosize
                        name="editContent"
                        className="message-edit-input"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={(e) => handleEditKeyDown(e, msg)}
                        minRows={1}
                        maxRows={6}
                        disabled={editLoading}
                        autoFocus
                        aria-label="Editar mensaje"
                    />
                </div>

                {hasSubmittedEdit && editError && !editLoading && (
                    <p className="message-edit-error" role="alert">
                        {editError}
                    </p>
                )}

                <div className="message-edit-actions">
                    <span className="message-edit-hint">
                        Esc para cancelar • Enter para guardar
                    </span>
                    <div className="message-edit-buttons">
                        <button
                            type="button"
                            className="message-edit-btn message-edit-btn--cancel"
                            onClick={cancelEditing}
                            disabled={editLoading}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="message-edit-btn message-edit-btn--save"
                            disabled={editLoading || !editContent.trim()}
                        >
                            {editLoading ? "Guardando..." : "Guardar"}
                        </button>
                    </div>
                </div>
            </form>
        );
    }

    const handleItemClick = () => {
        if (!isOwn || editingMessageId || isConfirmingDelete) return;
        const selectedText = window.getSelection?.()?.toString();
        if (selectedText) return;
        toggleMessageActions(msg._id);
    };

    return (
        <div
            className={`message-item ${isOwn ? "message-item--own" : ""} ${
                isActionsOpen ? "is-actions-open" : ""
            }`}
            data-message-item-id={msg._id}
            onClick={handleItemClick}
        >
            <div className="message-item-main">
                <p className="message-item-text">
                    {msg.content}
                    {edited && (
                        <span
                            className="message-edited-tag"
                            title={
                                msg.updatedAt
                                    ? `Editado: ${new Date(msg.updatedAt).toLocaleString()}`
                                    : "Editado"
                            }
                        >
                            (editado)
                        </span>
                    )}
                </p>

                {isConfirmingDelete && hasSubmittedDelete && deleteError && !deleteLoading && (
                    <p className="message-edit-error" role="alert">
                        {deleteError}
                    </p>
                )}
            </div>

            {isOwn && !editingMessageId && (
                <div
                    className="message-item-actions"
                    onClick={(e) => e.stopPropagation()}
                >
                    {isConfirmingDelete ? (
                        <div className="message-delete-confirm">
                            <span className="message-delete-confirm-label">
                                ¿Eliminar?
                            </span>
                            <button
                                type="button"
                                className="message-confirm-btn message-confirm-btn--yes"
                                onClick={() => confirmDelete(msg._id)}
                                disabled={deleteLoading}
                            >
                                {deleteLoading ? "..." : "Sí"}
                            </button>
                            <button
                                type="button"
                                className="message-confirm-btn message-confirm-btn--no"
                                onClick={cancelDeleteConfirm}
                                disabled={deleteLoading}
                            >
                                No
                            </button>
                        </div>
                    ) : (
                        <>
                            <button
                                type="button"
                                className="message-action-btn"
                                onClick={() => startEditing(msg)}
                                title="Editar mensaje"
                                aria-label="Editar mensaje"
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
                                    aria-hidden="true"
                                >
                                    <path d="M12 20h9" />
                                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                                </svg>
                                <span className="message-action-label">Editar</span>
                            </button>

                            {canDelete && (
                                <button
                                    type="button"
                                    className="message-action-btn message-action-btn--danger"
                                    onClick={() => requestDeleteConfirm(msg._id)}
                                    title="Eliminar mensaje"
                                    aria-label="Eliminar mensaje"
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
                                        aria-hidden="true"
                                    >
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                                    </svg>
                                    <span className="message-action-label">Eliminar</span>
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessageItem;
