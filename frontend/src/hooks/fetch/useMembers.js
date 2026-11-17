import { getMembersByWorkspace, inviteMemberToWorkspace } from '../../services/MembersService';
import useRequest from './useRequest';
import { useEffect } from 'react';

export const useMembersList = (workspace_id, userToken) => {
    const { response, loading, error, sendRequest } = useRequest()

    useEffect(() => {
        if (workspace_id && userToken) {
            sendRequest(
                () => getMembersByWorkspace(workspace_id, userToken)
            )
        }
    }, [workspace_id, userToken])

    return {
        members_response: response,
        members_loading: loading,
        members_error: error,
    }

}

export const useInviteMember = () => {
    const { response, loading, error, sendRequest } = useRequest()

    const inviteMember = (workspace_id, email, role, userToken) => {
        sendRequest(
            () => inviteMemberToWorkspace(workspace_id, email, role, userToken)
        )
    }

    return {
        invite_member_response: response,
        invite_member_loading: loading,
        invite_member_error: error,
        inviteMember,
    }
}