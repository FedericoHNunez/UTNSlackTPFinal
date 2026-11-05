import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { useWorkspaceList } from "../../hooks/useWorkspaceList";

export const WorkspaceList = () => {
   
const {
    workspace_loading,
    wokspace_error,
    wokspace_response} = useWorkspaceList();

    return (
        <>
            <ul>
                {wokspace_response &&
                    wokspace_response.data.workspaces.map((workspace) => (
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

            {workspace_loading && <p>Loading...</p>}
            {wokspace_response &&
                (wokspace_response.data.workspaces.length === 0 ? (
                    <button>crea tu primer workspace</button>
                ) : (
                    <button>crea otro workspace</button>
                ))}
            {wokspace_error && <p>{wokspace_error}</p>}
        </>
    );
};