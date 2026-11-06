import ENVIRONMENT from "../config/envConfig.js";
const url_backend = ENVIRONMENT.URL_BACKEND

export async function getChannelsByWorkspace(id, userToken) {
    const response_http = await fetch(`${url_backend}/api/workspaces/${id}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${userToken}`
        }
    })

    const response_body = await response_http.json()
    if (!response_body.ok) {
        throw new Error(response_body.message)
    }

    return response_body


}