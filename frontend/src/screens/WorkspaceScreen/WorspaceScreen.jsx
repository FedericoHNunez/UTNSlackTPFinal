import { useContext, useEffect } from "react";
import useRequest from "../../hooks/useRequest";
import { getWorkspaceByUser } from "../../services/workspaceService";
import { UserContext } from "../../Context/UserContext";
import { Link } from "react-router";

export const WorkspaceScreen = () => {
    const { userToken } = useContext(UserContext);
    const { loading, error, response, sendRequest } = useRequest();

    useEffect(() => {
        sendRequest(() => getWorkspaceByUser(userToken));
    }, []);

    return (
        <div>
            <h1>Workspaces</h1>

            <ul>
                {response &&
                    response.data.workspaces.map((workspace) => (
                        <li key={workspace.workspace_id}>
                            <Link
                                to={`/workspaces/${workspace.workspace_id}/channels`}
                                rel="stylesheet"
                            >
                                <h2>{workspace.workspace_name}</h2>
                            </Link>
                        </li>
                    ))}
            </ul>
            {loading && <p>Loading...</p>}
            {response &&
                (response.data.workspaces.length === 0 ? (
                    <button>crea tu primer workspace</button>
                ) : (
                    <button>crea otro workspace</button>
                ))}
            {error && <p>{error}</p>}
        </div>
    );
};
