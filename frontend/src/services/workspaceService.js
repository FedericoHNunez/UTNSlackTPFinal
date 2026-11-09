import ENVIRONMENT from "../config/envConfig.js";

const url_backend = ENVIRONMENT.URL_BACKEND;

export async function getWorkspaceByUser(userToken) {
    const response = await fetch(`${url_backend}/api/workspaces`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${userToken}`,
        },
    });
    return response.json();
}

export async function inviteNewUser(email, token) {
    const response = await fetch(`${url_backend}/api/workspaces/invite-new-user`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    return response.json();
}
