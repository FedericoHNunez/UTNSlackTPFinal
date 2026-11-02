import { useParams, Link } from "react-router"
import { useEffect, useContext } from "react"
import useRequest from "../../hooks/useRequest.js"
import { getChannelsByWorkspace } from "../../services/workspaceService.js"
import { UserContext } from "../../Context/UserContext.jsx"

export const ChannelScreen = () => {

    const { workspace_id } = useParams();
    const { userToken } = useContext(UserContext);
    const { response, error, loading, sendRequest } = useRequest();

    useEffect(() => {
        sendRequest(() => getChannelsByWorkspace(workspace_id, userToken));
    }, [workspace_id]);

    return (
        <>
            <h1>Channel</h1>
            <p>
                ID de workspace: {workspace_id}
            </p>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {response && (
                <ul>
                    {response.data.channels.map((channel) => (
                        <li key={channel._id}>
                            <Link to={`/workspaces/${workspace_id}/channels/${channel._id}/messages`}>
                                <h2>{channel.name}</h2>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}