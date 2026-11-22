import { useContext } from "react";
import { DirectMessagesContext } from "../../Context/DirectMessagesContext/DirectMessagesContext.jsx";

export const ConversationList = () => {
    const { currentDirectConversations } = useContext(DirectMessagesContext);

    console.log(currentDirectConversations);

    return (
        <h1>Conversaciones Directas</h1>
    );
};

export default ConversationList;
