import { useContext } from "react";
import { Link } from "react-router";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext.jsx";

export const WorkspaceList = () => {
    const { wokspace_error, currentWorkspaceList } = useContext(WorkspaceContext);

    return (
        <>

            {currentWorkspaceList &&
                (currentWorkspaceList.length === 0 ? (
                    <button>crea tu primer workspace</button>
                ) : (
                    <button>crea otro workspace</button>
                ))}
            {wokspace_error && <p>{wokspace_error}</p>}
            <ul>
                {currentWorkspaceList &&
                    <>
                        <p>O Puedes continuar a espacios de trabajo existentes</p>
                        {currentWorkspaceList.map((workspace) => (
                            <li key={workspace.workspace_id}>
                                <Link
                                    to={`/workspaces/${workspace.workspace_id}/channels`}
                                    rel="stylesheet"
                                >
                                    <div>
                                        <img src="/logo192.png" alt="Imagen Personalizada del espacio de trabajo" />
                                    </div>
                                    <div>
                                        <h2>{workspace.workspace_name}</h2>
                                        <p>`Mimebros ${workspace.workspace_members_count}`</p>
                                    </div>

                                </Link>
                            </li>
                        ))}
                    </>
                }
            </ul>
        </>
    );
};
