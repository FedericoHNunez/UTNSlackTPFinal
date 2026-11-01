import { useContext, useEffect } from "react";
import useRequest from "../../hooks/UseRequest";
import { getWorkspaceByUser } from "../../services/workspaceService";
import { UserContext } from "../../Context/UserContext";


export default function WorkspaceScreen() {

    const { userToken } = useContext(UserContext)
    const { loading, error, response, sendRequest } = useRequest()

    useEffect(() => {
        sendRequest(() => getWorkspaceByUser(userToken))
    }, [])

    return (
        <div>
            <h1>Workspace</h1>
            {response && response.data.workspaces.map((workspace) => (
                <div key={workspace.workspace_id}>
                    <p>{workspace.workspace_name}</p>
                </div>
            ))}
            {
                response && (
                    response.data.workspaces.length === 0
                        ? <button>crea tu primer workspace</button>
                        : <button>crea otro workspace</button>
                )
            }
        </div>
    );
}
