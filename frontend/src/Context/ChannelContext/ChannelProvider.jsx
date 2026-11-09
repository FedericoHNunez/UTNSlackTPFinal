import { useState, useContext, useEffect } from "react";
import { ChannelContext } from "./ChannelContext.jsx";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import { useChannelList, useCreateChannel } from "../../hooks/useChannel.js";

export const ChannelProvider = ({ children }) => {
    const [currentchannelList, setCurrentChannelList] = useState(null);
    const [currentchannel_id, setCurrentChannel_id] = useState(null);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const { userToken } = useContext(UserContext);

    const { channel_response, channel_error, channel_loading } = useChannelList(
        currentWorkspace_id,
        userToken
    );

    const {
        create_channel_response,
        create_channel_error,
        create_channel_loading,
        createChannel
    } = useCreateChannel();

    useEffect(() => {
        if (channel_response) {
            setCurrentChannelList(channel_response.data.channels);
        }
    }, [channel_response]);

    useEffect(() => {
        if (create_channel_response?.data?.channel) {
            const newChannel = create_channel_response.data.channel;
            setCurrentChannelList((prev) => [
                ...(prev || []),
                {
                    channel_id: newChannel._id,
                    channel_name: newChannel.name,
                    channel_description: newChannel.description,
                    workspace_id: newChannel.id_workspace
                }
            ]);
        }
    }, [create_channel_response]);

    const handleCreateChannel = (name, description) => {
        createChannel(currentWorkspace_id, name, description, userToken);
    };

    const values = {
        currentchannelList,
        setCurrentChannelList,
        channel_error,
        channel_loading,
        currentchannel_id,
        setCurrentChannel_id,
        create_channel_loading,
        create_channel_error,
        create_channel_response,
        handleCreateChannel
    };

    return (
        <ChannelContext.Provider value={values}>
            {children}
        </ChannelContext.Provider>
    );
};
