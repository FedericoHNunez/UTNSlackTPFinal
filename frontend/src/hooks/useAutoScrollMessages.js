import { useLayoutEffect, useRef } from "react";

export function useAutoScrollMessages(messagesList, activeConversationKey) {
    const listRef = useRef(null);
    const prevKeyRef = useRef(activeConversationKey);
    const prevLengthRef = useRef(0);

    useLayoutEffect(() => {
        const currentLength = messagesList?.length || 0;
        const conversationChanged = prevKeyRef.current !== activeConversationKey;
        const messageAdded = currentLength > prevLengthRef.current;

        if (listRef.current && (conversationChanged || messageAdded)) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }

        prevKeyRef.current = activeConversationKey;
        prevLengthRef.current = currentLength;
    }, [messagesList, activeConversationKey]);

    return listRef;
}

export default useAutoScrollMessages;
