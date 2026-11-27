import ENVIRONMENT from "../config/envConfig.js";
const url_backend = ENVIRONMENT.URL_BACKEND;

export const getMessagesByChannelID = async (workspace_id, channel_id, userToken) => {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}/channels/${channel_id}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${userToken}`
        }
    });
    const response_json = await response_http.json();
    return response_json;
};

export const createMessageChannel = async (workspace_id, channel_id, content, userToken) => {
    const response_http = await fetch(
        `${url_backend}/api/workspaces/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({ content })
        }
    );
    const response_json = await response_http.json();
    return response_json;
};

export const editMessageChannel = async (workspace_id, channel_id, message_id, content, userToken) => {
    const response_http = await fetch(
        `${url_backend}/api/workspaces/${workspace_id}/channels/${channel_id}/messages/${message_id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${userToken}`
            },
            body: JSON.stringify({ content })
        }
    );
    const response_json = await response_http.json();
    if (!response_json.ok) {
        throw new Error(response_json.message);
    }
    return response_json;
};

export const deleteMessageChannel = async (workspace_id, channel_id, message_id, userToken) => {
    const response_http = await fetch(
        `${url_backend}/api/workspaces/${workspace_id}/channels/${channel_id}/messages/${message_id}`,
        {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${userToken}`
            }
        }
    );
    const response_json = await response_http.json();
    if (!response_json.ok) {
        throw new Error(response_json.message);
    }
    return response_json;
};
