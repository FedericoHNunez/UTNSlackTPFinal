import { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { MessagesContext } from "../../Context/MessagesContext.jsx";
import { ChannelContext } from "../../Context/ChannelContext.jsx";

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
        <>
            <div>
                <h1>Messages Channel Screen</h1>
                <p>Channel ID: {currentchannel_id}</p>
            </div>
            {message_error && <p>Error: {message_error}</p>}
            {currentMessagesList &&
                currentMessagesList.map((message) => (
                    <div key={message._id}>
                        <p>{message.content}</p>
                    </div>
                ))}
        </>
    );
};