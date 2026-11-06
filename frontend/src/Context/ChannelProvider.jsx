import { useState, useContext, useEffect } from "react";
import { ChannelContext } from "./ChannelContext.jsx";
import { WorkspaceContext } from "./WorkspaceContext.jsx";
import { UserContext } from "./UserContext.jsx";
import { useChannelList } from "../hooks/useChannelList.js";

export const ChannelProvider = ({ children }) => {
    const [currentchannelList, setCurrentChannelList] = useState(null);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const { userToken } = useContext(UserContext);
    const [currentchannel_id, setCurrentChannel_id] = useState(null);
    const { channel_response, channel_error, channel_loading } = useChannelList(currentWorkspace_id, userToken);

    useEffect(() => {
        if (channel_response) {
            setCurrentChannelList(channel_response.data.channels);
        }
    }, [channel_response]);

    const values = {
        currentchannelList,
        channel_error,
        channel_loading,
        currentchannel_id,
        setCurrentChannel_id
    };

    return (
        <ChannelContext.Provider value={values}>
            {children}
        </ChannelContext.Provider>
    );
};
