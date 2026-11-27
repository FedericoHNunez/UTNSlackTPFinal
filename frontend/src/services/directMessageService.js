import ENVIRONMENT from "../config/envConfig.js";
const url_backend = ENVIRONMENT.URL_BACKEND;

export const getDirectConversations = async (userToken, workspace_id) => {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}/directMessages`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });
    const response_json = await response_http.json();
    if (!response_json.ok) {
        throw new Error(response_json.message);
    }
    return response_json;
};

export const getDirectMessagesByUserId = async (user_id, userToken, workspace_id) => {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}/directMessages/${user_id}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });
    const response_json = await response_http.json();
    if (!response_json.ok) {
        throw new Error(response_json.message);
    }
    return response_json;
};

export const createDirectMessage = async (user_id, message, userToken, workspace_id) => {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}/directMessages/${user_id}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({ message })
    });
    const response_json = await response_http.json();
    if (!response_json.ok) {
        throw new Error(response_json.message);
    }
    return response_json;
};

export const editDirectMessage = async (user_id, message_id, content, userToken, workspace_id) => {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}/directMessages/${user_id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`
        },
        body: JSON.stringify({ message_id, content })
    });
    const response_json = await response_http.json();
    if (!response_json.ok) {
        throw new Error(response_json.message);
    }
    return response_json;
};

export const deleteDirectMessage = async (user_id, message_id, userToken, workspace_id) => {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}/directMessages/${user_id}/${message_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${userToken}`
        }
    });
    const response_json = await response_http.json();
    if (!response_json.ok) {
        throw new Error(response_json.message);
    }
    return response_json;
};
