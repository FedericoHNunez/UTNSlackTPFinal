import ENVIRONMENT from "../config/envConfig.js";
const url_backend = ENVIRONMENT.URL_BACKEND;

export const getDirectConversations = async (userToken) => {
    const response_http = await fetch(`${url_backend}/api/directMessages`, {
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

export const getDirectMessagesByUserId = async (user_id, userToken) => {
    const response_http = await fetch(`${url_backend}/api/directMessages/${user_id}`, {
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

export const createDirectMessage = async (user_id, message, userToken) => {
    const response_http = await fetch(`${url_backend}/api/directMessages/${user_id}`, {
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
