import { useParams } from "react-router";
import { useContext, useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { UserContext } from "../../Context/UserContext";
import { getMessagesByChannelID } from "../../services/messagesChannelService";

export const MessagesChannelScreen = () => {
    const { channel_id, workspace_id } = useParams();
    const { userToken } = useContext(UserContext);
    const { response, error, sendRequest, loading } = useRequest();

    useEffect(() => {
        sendRequest(() =>
            getMessagesByChannelID(workspace_id, channel_id, userToken),
        );
    }, []);
    return (
        <>
            <div>
                <h1>Messages Channel Screen</h1>
                <p>Channel ID: {channel_id}</p>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {response &&
                response.data.messagesChannel.map((message) => (
                    <div key={message._id}>
                        <p>{message.content}</p>
                    </div>
                ))}
        </>
    );
};
