import { useState } from "react";

/* 
Este hook nos va a permitir manejar mediante estados la respuesta del servidor
*/
function useRequest() {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [errorCode, setErrorCode] = useState(null)
    async function sendRequest(requestFn) {
        try {
            setLoading(true)
            const response = await requestFn()
            setResponse(response)
            setError(null)
            setErrorCode(null)
        }
        catch (error) {
            setResponse(null)
            setError(error.message)
            setErrorCode(error.code || null)
        }
        finally {
            setLoading(false)
        }
    }
    return {
        loading,
        response,
        error,
        errorCode,
        sendRequest
    }
}
export default useRequest