import { useContext } from "react";
import { WorkspaceList } from "../../Components/WorkspaceList/WorkspaceList";
import SpinnerLoading from "../../Components/SpinnerLoading/SpinnerLoading";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext";
import { SlackLogo } from "../../Components/Ui/SlackLogo"
export const WorkspaceScreen = () => {
    const { workspace_loading } = useContext(WorkspaceContext);

    return (
        <>
            {workspace_loading ? (
                <SpinnerLoading fullScreen={true} text="Cargando espacios de trabajo..." />
            ) : (
                <>
                    <SlackLogo />
                    <h1>¡Hola de nuevo!</h1>
                    <p>Puedes crear un espacio de trabajo nuevo o elegir uno existente</p>
                    <WorkspaceList />
                </>
            )}
        </>
    );
};

export default WorkspaceScreen;
