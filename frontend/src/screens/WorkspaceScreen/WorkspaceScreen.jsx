import { useContext } from "react";
import { WorkspaceList } from "../../Components/WorkspaceList/WorkspaceList";
import SpinnerLoading from "../../Components/SpinnerLoading/SpinnerLoading";
import { WorkspaceContext } from "../../Context/WorkspaceContext/WorkspaceContext";
import { SlackLogo } from "../../Components/Ui/SlackLogo"
import InvitationModal from "../../Components/modal/InvitationModal";
import { useState } from "react";
import { Link } from "react-router";


export const WorkspaceScreen = () => {
    const { workspace_loading } = useContext(WorkspaceContext);
    const [showInvitationModal, setShowInvitationModal] = useState(false);

    return (
        <>
            {workspace_loading ? (
                <SpinnerLoading fullScreen={true} text="Cargando espacios de trabajo..." />
            ) : (
                <>
                    <Link to="/">
                        <SlackLogo color="black" />
                    </Link>
                    <h1>¡Hola de nuevo!</h1>
                    <p>Puedes crear un espacio de trabajo nuevo o elegir uno existente</p>
                    <WorkspaceList />
                    <button onClick={() => setShowInvitationModal(true)}>Invitar</button>
                    {showInvitationModal && (
                        <InvitationModal
                            onClose={() => setShowInvitationModal(false)}
                        />
                    )}
                </>
            )}
        </>
    );
};

export default WorkspaceScreen;
