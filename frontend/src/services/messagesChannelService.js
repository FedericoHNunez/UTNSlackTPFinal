import ENVIRONMENT from "../config/envConfig.js";
const url_backend = ENVIRONMENT.URL_BACKEND

export const getMessagesByChannelID = async (workspace_id, channel_id, userToken) => {
    const response_http = await fetch(`${url_backend}/api/workspaces/${workspace_id}/channels/${channel_id}`, {
        method: "GET",
        headers: {
        
            "Authorization": `Bearer ${userToken}`
        }
    });
    const response_json = await response_http.json();
    return response_json;
}