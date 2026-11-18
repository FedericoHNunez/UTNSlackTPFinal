import ENVIRONMENT from "../config/envConfig.js";
const url_backend = ENVIRONMENT.URL_BACKEND


export const getMembersByWorkspace = async (workspace_id, userToken) => {
    const response_http = await fetch(
        `${url_backend}/api/workspaces/${workspace_id}/members`,

        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`,
            },
        },
    )

    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }

    return response_body
}

export const inviteMemberToWorkspace = async (workspace_id, email, role, userToken) => {
    const response_http = await fetch(
        `${url_backend}/api/workspaces/${workspace_id}/members/invite`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userToken}`,
            },
            body: JSON.stringify({ email, role }),
        },
    )

    const response_body = await response_http.json()

    if (!response_body.ok) {
        throw new Error(response_body.message)
    }

    return response_body
}

export const acceptWorkspaceInvite = async (workspace_id, token) => {
    const response_http = await fetch(
        `${url_backend}/api/workspaces/${workspace_id}/members/accept-invite/${token}`,
        {
            method: 'GET',
        },
    )

    const response_body = await response_http.json()

    if (!response_body.ok) {
        const error = new Error(response_body.message)
        error.code = response_body.code || null
        throw error
    }

    return response_body
}
