import { ChannelHeader } from "../../Components/ChannelHeader/ChannelHeader.jsx";
import { ChannelList } from "../../Components/ChannelList/ChannelList.jsx"
import { useContext } from "react"
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx"
import { SpinnerLoading } from "../../Components/Ui/SpinnerLoading/SpinnerLoading.jsx";
import { MembersList } from "../../Components/MembersList/MembersList.jsx";


export const ChannelScreen = () => {

    const { channel_loading } = useContext(ChannelContext)
    return (
        <>

            {channel_loading
                ? <SpinnerLoading text='Cargando canales...' fullScreen={true} variant="dark" />
                :
                <>
                    <aside>
                        <ChannelHeader />
                        <ChannelList />
                        <MembersList />
                    </aside>
                </>
            }
        </>
    );
};
