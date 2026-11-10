import { Link, useParams } from "react-router";
import { useContext, useEffect } from "react";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { CreateChannelModal } from "../modal/CreateChannelModal.jsx";

export const ChannelList = () => {
    const { workspace_id } = useParams();
    const { currentWorkspace_id, setCurrentWorkspace_id } = useContext(WorkspaceContext);
    const { currentchannelList, channel_error } = useContext(ChannelContext);

    useEffect(() => {
        if (workspace_id) {
            setCurrentWorkspace_id(workspace_id);
        }
    }, [workspace_id]);

    return (
        <>
            <section>

                <h1>Channel</h1>
                <p>ID de workspace: {currentWorkspace_id}</p>

                {channel_error && <p>Error: {channel_error}</p>}
                {currentchannelList && (
                    <ul>
                        {currentchannelList.map((channel) => (
                            <li key={channel.channel_id}>
                                <Link
                                    to={`/workspaces/${currentWorkspace_id}/channels/${channel.channel_id}/messages`}
                                >
                                    <p>#{channel.channel_name}</p>
                                </Link>
                            </li>
                        ))}
                        <li>
                            <CreateChannelModal />
                        </li>
                    </ul>
                )}
            </section>
        </>
    );
};
