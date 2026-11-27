import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router";

export function useAutoScrollMessages(messagesList, activeConversationKey) {
    const location = useLocation();
    const listRef = useRef(null);
    const prevKeyRef = useRef(activeConversationKey);
    const prevLengthRef = useRef(0);
    const handledHighlightRef = useRef(null);

    const highlightMessageId = location.state?.highlightMessageId;
    const highlightTick = location.state?.highlightTick;
    const highlightToken = highlightMessageId
        ? `${highlightMessageId}::${highlightTick || ""}`
        : null;

    useLayoutEffect(() => {
        const currentLength = messagesList?.length || 0;
        const conversationChanged = prevKeyRef.current !== activeConversationKey;
        const messageAdded = currentLength > prevLengthRef.current;

        if (
            listRef.current &&
            highlightMessageId &&
            highlightToken !== handledHighlightRef.current &&
            currentLength > 0
        ) {
            const targetEl = listRef.current.querySelector(
                `[data-message-item-id="${highlightMessageId}"]`
            );
            if (targetEl) {
                handledHighlightRef.current = highlightToken;
                targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
                targetEl.classList.add("is-search-highlighted");
                const timer = setTimeout(() => {
                    targetEl.classList.remove("is-search-highlighted");
                }, 2600);

                prevKeyRef.current = activeConversationKey;
                prevLengthRef.current = currentLength;
                return () => clearTimeout(timer);
            }
        }

        if (listRef.current && (conversationChanged || messageAdded)) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }

        prevKeyRef.current = activeConversationKey;
        prevLengthRef.current = currentLength;
    }, [messagesList, activeConversationKey, highlightMessageId, highlightToken]);

    return listRef;
}

export default useAutoScrollMessages;
