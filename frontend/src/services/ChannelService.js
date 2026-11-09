import ENVIRONMENT from "../config/envConfig.js";
const url_backend = ENVIRONMENT.URL_BACKEND;

export async function getChannelsByWorkspace(id, userToken) {
    const response_http = await fetch(`${url_backend}/api/workspaces/${id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });

    const response_body = await response_http.json();
    if (!response_body.ok) {
        throw new Error(response_body.message);
    }

    return response_body;
}

export async function createChannel(workspace_id, name, description, userToken) {
    const response_http = await fetch(
        `${url_backend}/api/workspaces/${workspace_id}/channels`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`
            },
            body: JSON.stringify({ name, description })
        }
    );

    const response_body = await response_http.json();
    return response_body;
}
