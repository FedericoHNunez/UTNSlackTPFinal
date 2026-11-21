export function messageGrouper(messagesList) {
    const groupedMessages = (messagesList || []).reduce((groups, message) => {
        const lastGroup = groups[groups.length - 1];
        const sender = message.id_user || message.id_sender;
        const messageUserId = sender?._id || sender?.userName;

        if (lastGroup && lastGroup.userId === messageUserId) {
            lastGroup.messages.push(message);
        } else {
            groups.push({
                id: message._id,
                userId: messageUserId,
                userName: sender?.userName,
                messages: [message]
            });
        }

        return groups;
    }, []);
    
    return groupedMessages;
}