import { useState, useContext, useEffect } from "react";
import { ChannelContext } from "./ChannelContext.jsx";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import { useChannelList, useCreateChannel } from "../../hooks/fetch/useChannel.js";

export const ChannelProvider = ({ children }) => {
    const [currentChannelList, setCurrentChannelList] = useState(null);
    const [currentChannel_id, setCurrentChannel_id] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const { userToken } = useContext(UserContext);

    const { channel_response,
         channel_error, 
         channel_loading 
        } = useChannelList( currentWorkspace_id, userToken);
      
        useEffect(() => {
            if (channel_response) {
                setCurrentChannelList(channel_response.data.channels);
            }
        }, [channel_response]);

    const {
        create_channel_response,
        create_channel_error,
        create_channel_loading,
        createChannel
    } = useCreateChannel();
    
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

        currentChannelList,
        setCurrentChannelList,
        channel_error,
        channel_loading,
        currentChannel_id,
        setCurrentChannel_id,
        create_channel_loading,
        create_channel_error,
        create_channel_response,
        handleCreateChannel,
        searchValue,
        setSearchValue
    };

    return (
        <ChannelContext.Provider value={values}>
            {children}
        </ChannelContext.Provider>
    );
};
