import { useContext, useEffect } from "react";
import useRequest from "../hooks/useRequest.js";
import { getWorkspaceByUser } from "../services/workspaceService.js";
import { UserContext } from "../Context/UserContext.jsx";

export const useWorkspaceList = () => {
     const { userToken } = useContext(UserContext);
    const { loading, error, response, sendRequest } = useRequest();

    useEffect(() => {
        sendRequest(() => getWorkspaceByUser(userToken));
    }, []); 

    return { 
    workspace_loading: loading, 
    wokspace_error: error, 
    wokspace_response: response };



}