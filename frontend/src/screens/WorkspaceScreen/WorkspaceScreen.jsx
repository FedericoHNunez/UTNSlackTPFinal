import { useContext } from "react";
import { WorkspaceList } from "../../Components/WorkspaceList/WorkspaceList";
import SpinnerLoading from "../../Components/SpinnerLoading/SpinnerLoading";
import { WorkspaceContext } from "../../Context/WorkspaceContext";

export const WorkspaceScreen = () => {
    const { workspace_loading } = useContext(WorkspaceContext);

    return (
        <>
            {workspace_loading ? (
                <SpinnerLoading fullScreen={true} text="Cargando espacios de trabajo..." />
            ) : (
                <>
                    <h1>Bienvenido/a a UTN Slack</h1>
                    <h2>Tus Workspaces</h2>
                    <WorkspaceList />
                </>
            )}
        </>
    );
};

export default WorkspaceScreen;
