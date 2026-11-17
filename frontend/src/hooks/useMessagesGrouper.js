export function messageGrouper(messagesList) {
    const groupedMessages = (messagesList || []).reduce((groups, message) => {
        const lastGroup = groups[groups.length - 1];
        const messageUserId = message.id_user?._id || message.id_user?.userName;

        if (lastGroup && lastGroup.userId === messageUserId) {
            lastGroup.messages.push(message);
        } else {
            groups.push({
                id: message._id,
                userId: messageUserId,
                userName: message.id_user?.userName,
                messages: [message]
            });
        }

        return groups;
    }, []);
    
    return groupedMessages;
}