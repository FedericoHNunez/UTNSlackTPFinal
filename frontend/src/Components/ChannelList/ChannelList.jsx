import { Link, useParams } from "react-router";
import { useContext, useEffect, useState } from "react";
import { ChannelContext } from "../../Context/ChannelContext/ChannelContext.jsx";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";
import { CreateChannelModal } from "../modal/CreateChannelModal.jsx";
import "./ChannelList.css";
import { SearchForm } from "../Forms/SearchForm/SearchForm.jsx";

export const ChannelList = () => {
    const { workspace_id } = useParams();
    const { currentWorkspace_id, setCurrentWorkspace_id, currentWorkspaceList } = useContext(WorkspaceContext);
    const { currentchannelList, channel_error } = useContext(ChannelContext);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        if (workspace_id) {
            setCurrentWorkspace_id(workspace_id);
        }
    }, [workspace_id]);
    
    const currentWorkspace = currentWorkspaceList?.find((workspace) => workspace.workspace_id === workspace_id);

    return (
        <section className="channel-list" aria-label="Canales del espacio de trabajo">
            <h4 className="channel-list-title">{currentWorkspace?.workspace_name || "Cargando..."}</h4>
            <SearchForm
                placeholder="Buscar un canal"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <h4>Canales</h4>
            {channel_error && (
                <p className="channel-list-error" role="alert">
                    Error: {channel_error}
                </p>
            )}
            {currentchannelList && (
                <ul className="channel-list-items">
                    {currentchannelList
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

