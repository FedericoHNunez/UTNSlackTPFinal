import { Link, useParams } from "react-router";
import { useContext, useEffect } from "react";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { CreateChannelModal } from "../modal/CreateChannelModal.jsx";
import "./ChannelList.css";

export const ChannelList = () => {
    const { workspace_id } = useParams();
    const { currentWorkspace_id, setCurrentWorkspace_id } = useContext(WorkspaceContext);
    const { currentChannelList, channel_error, searchValue } = useContext(ChannelContext);

    useEffect(() => {
        if (workspace_id) {
            setCurrentWorkspace_id(workspace_id);
        }
    }, [workspace_id]);

    return (
        <section className="channel-list" aria-label="Canales del espacio de trabajo">
            <h4>Canales</h4>
            {channel_error && (
                <p className="channel-list-error" role="alert">
                    Error: {channel_error}
                </p>
            )}
            {currentChannelList && (
                <ul className="channel-list-items">
                    {currentChannelList
                        .filter((channel) =>
                            channel.channel_name
                                .toLowerCase()
                                .includes(searchValue.toLowerCase())
                        )
                        .map((channel) => (
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

