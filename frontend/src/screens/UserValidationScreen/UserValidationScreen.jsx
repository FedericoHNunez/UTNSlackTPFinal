import { useEffect } from "react"
import { Link, useParams } from "react-router"
import useRequest from "../../hooks/UseRequest"
import { validateUser } from "../../services/authService.js"


export default function UserValidationScreen() {
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

