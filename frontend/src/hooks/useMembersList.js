import { getMembersByWorkspace } from '../services/MembersService';
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