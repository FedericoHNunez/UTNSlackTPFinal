import { MembersContext } from "./MembersContext";
import { UserContext } from "../UserContext/UserContext";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import { useState, useContext, useEffect } from "react";
import { useMembersList } from "../../hooks/useMembersList";


export const MembersProvider = ({ children }) => {

    const { userToken } = useContext(UserContext);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const [currentWorkspaceMembers, setCurrentWorkspaceMembers] = useState([]);

    const {
        members_response,
        members_error,
        members_loading
    } = useMembersList(currentWorkspace_id, userToken);

    useEffect(() => {
        if (members_response?.data?.members) {
            setCurrentWorkspaceMembers(members_response.data.members);
        }
    }, [members_response]);

    const values = {
        currentWorkspaceMembers,
        members_error,
        members_loading,
        setCurrentWorkspaceMembers
    };

    return (
        <MembersContext.Provider value={values}>
            {children}
        </MembersContext.Provider>
    );
};