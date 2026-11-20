import { useState, useContext, useEffect } from "react";
import { Outlet } from "react-router";
import { ChannelContext } from "./ChannelContext.jsx";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext.jsx";
import { UserContext } from "../UserContext/UserContext.jsx";
import {
    useGetChannelList,
    useCreateChannel,
    useEditChannel,
    useDeleteChannel
} from "../../hooks/fetch/useChannel.js";
import { capitalizeListFields } from "../../hooks/useCapitalize.js";

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
            setCurrentChannelList(
                capitalizeListFields(get_channel_response.data.channels, [
                    "channel_name",
                    "channel_description"
                ])
            );
        }
    }, [get_channel_response]);

    const {
        create_channel_response,
        create_channel_error,
        create_channel_loading,
        createChannel
    } = useCreateChannel();

    const {
        edit_channel_response,
        edit_channel_error,
        edit_channel_loading,
        editChannel
    } = useEditChannel();

    const {
        delete_channel_response,
        delete_channel_error,
        delete_channel_loading,
        deleteChannel
    } = useDeleteChannel();

    useEffect(() => {
        if (create_channel_response?.data?.channel) {
            getChannelList(false);
        }
    }, [create_channel_response]);

    useEffect(() => {
        if (edit_channel_response?.data?.channel) {
            getChannelList(false);
        }
    }, [edit_channel_response]);

    useEffect(() => {
        if (delete_channel_response?.ok) {
            getChannelList(false);
        }
    }, [delete_channel_response]);

    const handleCreateChannel = (name, description) => {
        createChannel(currentWorkspace_id, name, description, userToken);
    };

    const handleEditChannel = (name, description, channel_id = currentChannel_id, workspace_id = currentWorkspace_id) => {
        editChannel(workspace_id, channel_id, name, description, userToken);
    };

    const handleDeleteChannel = (channel_id = currentChannel_id, workspace_id = currentWorkspace_id) => {
        deleteChannel(workspace_id, channel_id, userToken);
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
        edit_channel_loading,
        edit_channel_error,
        edit_channel_response,
        handleEditChannel,
        delete_channel_loading,
        delete_channel_error,
        delete_channel_response,
        handleDeleteChannel,
        searchValue,
        setSearchValue
    };

    return (
        <ChannelContext.Provider value={values}>
            <Outlet />
        </ChannelContext.Provider>
    );
};
