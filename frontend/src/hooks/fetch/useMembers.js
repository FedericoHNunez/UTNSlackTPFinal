import {
    getMembersByWorkspace,
    inviteMemberToWorkspace,
    acceptWorkspaceInvite
} from '../../services/MembersService';
import useRequest from './useRequest';
import { useEffect } from 'react';

export const useGetMembersList = (workspace_id, userToken) => {
    const { response, loading, error, sendRequest } = useRequest()

    useEffect(() => {
        if (workspace_id && userToken) {
            sendRequest(
                () => getMembersByWorkspace(workspace_id, userToken)
            )
        }
    }, [workspace_id, userToken])

    return {
        get_members_response: response,
        get_members_loading: loading,
        get_members_error: error,
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

export const useAcceptWorkspaceInvite = (workspace_id, token) => {
    const { response, loading, error, errorCode, sendRequest } = useRequest()

    useEffect(() => {
        if (workspace_id && token) {
            sendRequest(
                () => acceptWorkspaceInvite(workspace_id, token)
            )
        }
    }, [workspace_id, token])

    return {
        accept_invite_response: response,
        accept_invite_loading: loading,
        accept_invite_error: error,
        accept_invite_error_code: errorCode,
    }
}