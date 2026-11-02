
const url_backend = "https://utnslacktpfinal-backend.vercel.app"

export async function getWorkspaceByUser(token) {
    const response = await fetch(`${url_backend}/api/workspaces`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
    )
    return response.json()
}

export async function getChannelsByWorkspace(id, token) {
    const response_http = await fetch(`${url_backend}/api/workspaces/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })

    const response_body = await response_http.json()
    if (!response_body.ok) {
        throw new Error(response_body.message)
    }

    return response_body


}