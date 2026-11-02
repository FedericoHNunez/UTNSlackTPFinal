import { useEffect } from "react"
import { Link, useParams } from "react-router"
import useRequest from "../../hooks/useRequest"
import { validateUser } from "../../services/authService.js"


export const UserValidationScreen = () => {
    const { token } = useParams()
    const { loading, error, response, sendRequest } = useRequest();

    useEffect(() => {
        if (token) {
            sendRequest(
                () => validateUser(token)
            )
        }

    }, [])

    return (
        <>

            {
                loading ?
                    <p>Validando Usuario...</p> :
                    error ?
                        <p>{error}</p> :
                        <h1>Tu usuario ha sido validado correctamente</h1>
            }
            <Link to="/login">Iniciar Sesión</Link>


        </>
    )
}

