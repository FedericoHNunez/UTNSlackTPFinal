import { useContext } from "react";
import { Link } from "react-router";
import { WorkspaceContext } from "../../Context/WorkspaceContext.jsx";

export const WorkspaceList = () => {
    const { wokspace_error, currentWorkspaceList } = useContext(WorkspaceContext);

    return (
        <>

            <ul>
                {currentWorkspaceList &&
                    currentWorkspaceList.map((workspace) => (
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
            {currentWorkspaceList &&
                (currentWorkspaceList.length === 0 ? (
                    <button>crea tu primer workspace</button>
                ) : (
                    <button>crea otro workspace</button>
                ))}
            {wokspace_error && <p>{wokspace_error}</p>}
        </>
    );
};