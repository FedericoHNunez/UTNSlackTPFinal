import { Outlet, useParams } from "react-router";
import { MembersContext } from "./MembersContext";
import { UserContext } from "../UserContext/UserContext";
import { WorkspaceContext } from "../WorkspaceContext/WorkspaceContext";
import { useState, useContext, useEffect } from "react";
import { useGetMembersList, useInviteMember } from "../../hooks/fetch/useMembers";


export const MembersProvider = () => {
    const { workspace_id } = useParams();
    const { userToken } = useContext(UserContext);
    const { currentWorkspace_id } = useContext(WorkspaceContext);
    const [currentWorkspaceMembers, setCurrentWorkspaceMembers] = useState([]);

    const activeWorkspaceId = workspace_id || currentWorkspace_id;

    const {
        get_members_response,
        get_members_error,
        get_members_loading,
        getMembersList
    } = useGetMembersList(activeWorkspaceId, userToken);

    const {
        invite_member_response,
        invite_member_loading,
        invite_member_error,
        inviteMember
    } = useInviteMember();

    useEffect(() => {
        if (get_members_response?.data?.members) {
            setCurrentWorkspaceMembers(get_members_response.data.members);
        }
    }, [get_members_response]);

    const handleInviteMember = (email, role = "user", ws_id = activeWorkspaceId) => {
        inviteMember(ws_id, email, role, userToken);
    };

    const refreshMembers = () => getMembersList(false);

    const values = {
        currentWorkspaceMembers,
        get_members_error,
        get_members_loading,
        getMembersList,
        refreshMembers,
        setCurrentWorkspaceMembers,
        invite_member_response,
        invite_member_loading,
        invite_member_error,
        handleInviteMember
    };

    return (
        <MembersContext.Provider value={values}>
            <Outlet />
        </MembersContext.Provider>
    );
};