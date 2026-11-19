import { ChannelHeader } from "../../Components/Channel/ChannelHeader/ChannelHeader.jsx";
import { ChannelList } from "../../Components/Channel/ChannelList/ChannelList.jsx";
import { useContext } from "react";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { SpinnerLoading } from "../../Components/Ui/SpinnerLoading/SpinnerLoading.jsx";
import { MembersList } from "../../Components/Channel/MembersList/MembersList.jsx";


export const ChannelScreen = () => {

    const { get_channel_loading } = useContext(ChannelContext)
    return (
        <>

            {get_channel_loading
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
