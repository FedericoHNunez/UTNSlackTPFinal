
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