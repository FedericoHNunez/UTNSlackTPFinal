import { WorkspaceContext } from "./WorkspaceContext.jsx";

export const WorkspaceProvider = ({ children }) => {
    const values = {};

    return (
        <WorkspaceContext.Provider value={values}>
            {children}
        </WorkspaceContext.Provider>
    );
};
