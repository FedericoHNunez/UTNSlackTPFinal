import { useContext } from "react";
import { MessagesContext } from "../../Context/MessagesContext/MessagesContext.jsx";
import { SpinnerLoading } from "../../Components/SpinnerLoading/SpinnerLoading.jsx";
import { MessageList } from "../../Components/MessageList/MessageList.jsx";
export const MessagesChannelScreen = () => {
    const { message_loading } = useContext(MessagesContext);
    return (
        <>
            {message_loading
                ? <SpinnerLoading text="Cargando mensajes del canal..." />
                : <MessageList />
            }
        </>
    );
};
