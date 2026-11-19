import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router";
import { ChannelContext } from "./ChannelContext.jsx";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import { useGetChannelList, useCreateChannel } from "../../hooks/fetch/useChannel.js";

export const ChannelProvider = () => {
    const [currentChannelList, setCurrentChannelList] = useState(null);
    const [currentChannel_id, setCurrentChannel_id] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const { userToken } = useContext(UserContext);

    const {
        get_channel_response,
        get_channel_error,
        get_channel_loading,
        getChannelList
    } = useGetChannelList(currentWorkspace_id, userToken);

    useEffect(() => {
        if (get_channel_response) {
            setCurrentChannelList(get_channel_response.data.channels);
        }
    }, [get_channel_response]);

    const {
        create_channel_response,
        create_channel_error,
        create_channel_loading,
        createChannel
    } = useCreateChannel();

    useEffect(() => {
        if (create_channel_response?.data?.channel) {
            getChannelList(false);
        }
    }, [create_channel_response]);

    const handleCreateChannel = (name, description) => {
        createChannel(currentWorkspace_id, name, description, userToken);
    };

    const values = {

        currentChannelList,
        setCurrentChannelList,
        get_channel_error,
        get_channel_loading,
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
            <Outlet />
        </ChannelContext.Provider>
    );
};
