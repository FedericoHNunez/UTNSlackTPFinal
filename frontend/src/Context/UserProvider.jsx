import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {

    const [userToken, setUserToken] = useState(
        () => localStorage.getItem("auth_token") || null
    )

    useEffect(() => {
        if (userToken) {
            localStorage.setItem("auth_token", userToken)
        } else {
            localStorage.removeItem("auth_token")
        }
    }, [userToken])

    const values = {
        userToken,
        setUserToken,
    }
    return (
    <UserContext.Provider value={values}>
        {children}
    </UserContext.Provider>
)}
