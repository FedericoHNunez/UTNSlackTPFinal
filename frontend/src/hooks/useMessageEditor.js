import { useEffect, useState } from "react";

export const isMessageEdited = (msg) => {
    if (!msg?.createdAt || !msg?.updatedAt || msg?.active === false) return false;
    return new Date(msg.updatedAt).getTime() - new Date(msg.createdAt).getTime() > 1000;
};

export function useMessageEditor({
    onSave,
    editResponse,
    editLoading,
    editError,
    onDelete,
    deleteResponse,
    deleteLoading,
    deleteError,
    resetKey
}) {
    const [activeActionMessageId, setActiveActionMessageId] = useState(null);
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editContent, setEditContent] = useState("");
    const [hasSubmittedEdit, setHasSubmittedEdit] = useState(false);

    const [confirmingDeleteId, setConfirmingDeleteId] = useState(null);
    const [hasSubmittedDelete, setHasSubmittedDelete] = useState(false);

    useEffect(() => {
        setActiveActionMessageId(null);
        setEditingMessageId(null);
        setEditContent("");
        setHasSubmittedEdit(false);
        setConfirmingDeleteId(null);
        setHasSubmittedDelete(false);
    }, [resetKey]);

    useEffect(() => {
        const openId = confirmingDeleteId || activeActionMessageId;
        if (!openId) return;

        const handlePointerDownOutside = (event) => {
            if (deleteLoading) return;
            const activeItem = event.target.closest?.(
                `[data-message-item-id="${openId}"]`
            );
            if (!activeItem) {
                setActiveActionMessageId(null);
                setConfirmingDeleteId(null);
                setHasSubmittedDelete(false);
            }
        };

        document.addEventListener("pointerdown", handlePointerDownOutside);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDownOutside);
        };
    }, [activeActionMessageId, confirmingDeleteId, deleteLoading]);

    useEffect(() => {
        if (
            hasSubmittedEdit &&
            editResponse?.ok &&
            !editLoading &&
            !editError
        ) {
            setEditingMessageId(null);
            setEditContent("");
            setHasSubmittedEdit(false);
        }
    }, [hasSubmittedEdit, editResponse, editLoading, editError]);

    useEffect(() => {
        if (
            hasSubmittedDelete &&
            deleteResponse?.ok &&
            !deleteLoading &&
            !deleteError
        ) {
            setConfirmingDeleteId(null);
            setActiveActionMessageId(null);
            setHasSubmittedDelete(false);
        }
    }, [hasSubmittedDelete, deleteResponse, deleteLoading, deleteError]);

    const toggleMessageActions = (messageId) => {
        if (editingMessageId || deleteLoading) return;
        setConfirmingDeleteId(null);
        setHasSubmittedDelete(false);
        setActiveActionMessageId((prev) => (prev === messageId ? null : messageId));
    };

    const closeMessageActions = () => {
        if (deleteLoading) return;
        setActiveActionMessageId(null);
        setConfirmingDeleteId(null);
        setHasSubmittedDelete(false);
    };

    const startEditing = (msg) => {
        if (msg?.active === false) return;
        setActiveActionMessageId(null);
        setConfirmingDeleteId(null);
        setHasSubmittedDelete(false);
        setEditingMessageId(msg._id);
        setEditContent(msg.content || "");
        setHasSubmittedEdit(false);
    };

    const cancelEditing = () => {
        if (editLoading) return;
        setEditingMessageId(null);
        setEditContent("");
        setHasSubmittedEdit(false);
    };

    const submitEdit = (msg) => {
        const trimmed = editContent.trim();
        if (!trimmed || editLoading) return;
        if (trimmed === (msg.content || "").trim()) {
            cancelEditing();
            return;
        }
        setHasSubmittedEdit(true);
        onSave?.(msg._id, trimmed);
    };

    const handleEditKeyDown = (e, msg) => {
        if (e.key === "Escape") {
            e.preventDefault();
            cancelEditing();
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            submitEdit(msg);
        }
    };

    const requestDeleteConfirm = (messageId) => {
        if (deleteLoading) return;
        setActiveActionMessageId(messageId);
        setConfirmingDeleteId(messageId);
        setHasSubmittedDelete(false);
    };

    const cancelDeleteConfirm = () => {
        if (deleteLoading) return;
        setConfirmingDeleteId(null);
        setHasSubmittedDelete(false);
    };

    const confirmDelete = (messageId) => {
        if (deleteLoading || !onDelete) return;
        setHasSubmittedDelete(true);
        onDelete(messageId);
    };

    return {
        activeActionMessageId,
        toggleMessageActions,
        closeMessageActions,
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
        canDelete: Boolean(onDelete),
        confirmingDeleteId,
        hasSubmittedDelete,
        requestDeleteConfirm,
        cancelDeleteConfirm,
        confirmDelete,
        deleteLoading,
        deleteError
    };
}

export default useMessageEditor;
