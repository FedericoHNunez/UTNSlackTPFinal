import useRequest from "./useRequest.js";
import { deleteUserMe, getUserMe } from "../../services/authService.js";

export const useGetUserMe = () => {
    const { loading, error, response, sendRequest } = useRequest();

    const getUser = (userToken, showLoading = true) => {
        if (userToken) {
            sendRequest(() => getUserMe(userToken), showLoading);
        }
    };

    return {
        get_user_loading: loading,
        get_user_error: error,
        get_user_response: response,
        getUser
    };
};

export const useDeleteUser = () => {
    const { loading, error, response, sendRequest } = useRequest();

    const deleteUser = (userToken) => {
        if (userToken) {
            sendRequest(() => deleteUserMe(userToken));
        }
    };

    return {
        delete_user_loading: loading,
        delete_user_error: error,
        delete_user_response: response,
        deleteUser
    };
};
