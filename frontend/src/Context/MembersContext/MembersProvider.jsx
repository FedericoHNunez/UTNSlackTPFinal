import { MembersContext } from "./MembersContext";
import { UserContext } from "../UserContext/UserContext";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import { useState, useContext, useEffect } from "react";
import { useMembersList, useInviteMember } from "../../hooks/fetch/useMembers";


export const MembersProvider = ({ children }) => {

    const { userToken } = useContext(UserContext);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const [currentWorkspaceMembers, setCurrentWorkspaceMembers] = useState([]);

    const {
        members_response,
        members_error,
        members_loading
    } = useMembersList(currentWorkspace_id, userToken);

    const {
        invite_member_response,
        invite_member_loading,
        invite_member_error,
        inviteMember
    } = useInviteMember();

    useEffect(() => {
        if (members_response?.data?.members) {
            setCurrentWorkspaceMembers(members_response.data.members);
        }
    }, [members_response]);

    const handleInviteMember = (email, role = "user", workspace_id = currentWorkspace_id) => {
        inviteMember(workspace_id, email, role, userToken);
    };

    const values = {
        currentWorkspaceMembers,
        members_error,
        members_loading,
        setCurrentWorkspaceMembers,
        invite_member_response,
        invite_member_loading,
        invite_member_error,
        handleInviteMember
    };

    return (
        <MembersContext.Provider value={values}>
            {children}
        </MembersContext.Provider>
    );
};