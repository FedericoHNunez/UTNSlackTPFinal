import { useParams } from "react-router";



export const MessagesChannelScreen = () => {
    const { channel_id } = useParams();

    return (
        <div>
            <h1>Messages Channel Screen</h1>
            <p>Channel ID: {channel_id}</p>

        </div>
    );
};