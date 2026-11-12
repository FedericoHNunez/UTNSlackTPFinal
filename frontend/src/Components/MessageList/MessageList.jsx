import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { MessagesContext } from "../../Context/MessagesContext/MessagesContext.jsx";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";

export const MessageList = () => {
    const { channel_id } = useParams();
    const { currentMessagesList, message_error } = useContext(MessagesContext);
    const { currentchannel_id, setCurrentChannel_id } = useContext(ChannelContext);

    useEffect(() => {
        if (channel_id) {
            setCurrentChannel_id(channel_id);
        }
    }, [channel_id]);

    return (
        <section aria-label="Lista de mensajes">
            <header>
                <h1>Messages Channel Screen</h1>
                <p>Channel ID: {currentchannel_id}</p>
            </header>
            {message_error && <p role="alert">Error: {message_error}</p>}
            {currentMessagesList &&
                currentMessagesList.map((message) => (
                    <article key={message._id}>
                        <p>{message.content}</p>
                    </article>
                ))}
        </section>
    );
};