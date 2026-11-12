import { useContext } from "react";
import { MessagesContext } from "../../Context/MessagesContext/MessagesContext.jsx";
import { SpinnerLoading } from "../../Components/Ui/SpinnerLoading/SpinnerLoading.jsx";
import { MessageList } from "../../Components/MessageList/MessageList.jsx";
import "./MessagesChannelScreen.css"
export const MessagesChannelScreen = () => {
    const { message_loading } = useContext(MessagesContext);
    return (
        <>
            <div className="mesages-channel-container">

                {message_loading
                    ? <SpinnerLoading text="Cargando mensajes del canal..." fullScreen={true} />
                    : <MessageList />
                }
            </div>
        </>
    );
};
