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
