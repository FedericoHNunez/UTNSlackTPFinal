import ENVIRONMENT from "../config/envConfig.js";

const url_backend = ENVIRONMENT.URL_BACKEND;

export async function getWorkspaceByUserService(userToken) {
    const response = await fetch(`${url_backend}/api/workspaces`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });
    return response.json();
}

export async function createWorkspaceService(name, description, userToken) {
    const response_http = await fetch(`${url_backend}/api/workspaces`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({ name, description }),
    });

    const response_body = await response_http.json();
    if (!response_body.ok) {
        throw new Error(response_body.message);
    }

    return response_body;
}

export async function inviteNewUserService(email, token) {
    const response_http = await fetch(`${url_backend}/api/workspaces/invite-new-user`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });

    const response_body = await response_http.json();
    if (!response_body.ok) {
        throw new Error(response_body.message);
    }

    return response_body;
}

export async function deleteWorkspaceService(workspace_id, token) {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    const response_body = await response_http.json();
    if (!response_body.ok) {
        throw new Error(response_body.message);
    }

    return response_body;
}

export async function editWorkspaceService(workspace_id, name, description, token) {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name, description }),
    });

    const response_body = await response_http.json();
    if (!response_body.ok) {
        throw new Error(response_body.message);
    }

    return response_body;
}
