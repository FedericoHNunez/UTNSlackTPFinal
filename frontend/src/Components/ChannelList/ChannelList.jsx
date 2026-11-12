import { Link, useParams } from "react-router";
import { useContext, useEffect } from "react";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { CreateChannelModal } from "../modal/CreateChannelModal.jsx";
import "./ChannelList.css";

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
        <section className="channel-list" aria-label="Canales del espacio de trabajo">
            <h2 className="channel-list-title">Canales</h2>
            <p className="channel-list-workspace-id">ID de workspace: {currentWorkspace_id}</p>

            {channel_error && (
                <p className="channel-list-error" role="alert">
                    Error: {channel_error}
                </p>
            )}
            {currentchannelList && (
                <ul className="channel-list-items">
                    {currentchannelList.map((channel) => (
                        <li key={channel.channel_id} className="channel-list-item">
                            <Link
                                to={`/workspaces/${currentWorkspace_id}/channels/${channel.channel_id}/messages`}
                                className="channel-list-link"
                            >
                                <p>#{channel.channel_name}</p>
                            </Link>
                        </li>
                    ))}
                    <li className="channel-list-item">
                        <CreateChannelModal />
                    </li>
                </ul>
            )}
        </section>
    );
};

