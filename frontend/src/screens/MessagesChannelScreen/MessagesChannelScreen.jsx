import { useContext } from "react";
import { MessagesContext } from "../../Context/MessagesContext/MessagesContext.jsx";
import { SpinnerLoading } from "../../Components/Ui/SpinnerLoading/SpinnerLoading.jsx";
import { MessageList } from "../../Components/Channel/MessageList/MessageList.jsx";
import { SendMessageForm } from "../../Components/Forms/SendMessageForm/SendMessageForm.jsx";
import "./MessagesChannelScreen.css"
export const MessagesChannelScreen = () => {
    const { get_message_loading } = useContext(MessagesContext);
    return (
        <>
            <div className="mesages-channel-container">

                {get_message_loading
                    ? <SpinnerLoading text="Cargando mensajes del canal..." fullScreen={true} />
                    : 
                    <>
                    <MessageList />
                    <SendMessageForm />
                    </>
                }
            </div>
        </>
    );
};
