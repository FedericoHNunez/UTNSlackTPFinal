import ENVIRONMENT from "../config/envConfig.js"

const url_backend = ENVIRONMENT.URL_BACKEND

export async function getWorkspaceByUser(userToken) {
    const response = await fetch(`${url_backend}/api/workspaces`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        }
    )
    return response.json()
}

