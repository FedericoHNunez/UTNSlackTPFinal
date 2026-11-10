import ENVIRONMENT from "../config/envConfig.js";
const url_backend = ENVIRONMENT.URL_BACKEND

/* 
Interaccion con la API
*/


export async function login(email, password) {
    const response_http = await fetch(
        `${url_backend}/api/auth/login`,
        {
            method: 'POST',
            headers: {
                //Le decimos al servidor que tipo de dato estamos enviando
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }
    )

    //Leemos el cuerpo de la respuesta como un JSON
    const response_body = await response_http.json()
    if (!response_body.ok) {
        const error = new Error(response_body.message)
        error.code = response_body.code || null
        throw error
    }

    return response_body
}

export async function register(email, password, userName) {

    const response_http = await fetch(
        `${url_backend}/api/auth/register`,
        {
            method: 'POST',
            headers: {
                'content-Type': "application/json"
            },
            body: JSON.stringify({
                email,
                userName,
                password
            })
        })

    const response_body = await response_http.json()
    if (!response_body.ok) {
        const error = new Error(response_body.message)
        error.code = response_body.code || null
        throw error
    }   
    return response_body


}

export const resetPassword = async (email) => {
    const response_http = await fetch(`${url_backend}/api/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });
    const response_body = await response_http.json();
    if (!response_http.ok) throw new Error(response_body.message);
    return response_body;
};

export const changePassword = async (newPassword, confirmNewPassword, token) => {
    const response_http = await fetch(`${url_backend}/api/auth/reset-password`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword, confirmNewPassword, token })
    });
    const response_body = await response_http.json();
    if (!response_http.ok) throw new Error(response_body.message);
    return response_body;
};

export async function validateUser(token) {
    const response_http = await fetch(`${url_backend}/api/auth/verify-email/${token}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });

    const response_body = await response_http.json();
    if (!response_body.ok) {
        const error = new Error(response_body.message);
        error.code = response_body.code || null;
        throw error;
    }
    return response_body;
};

export async function resendVerification(email) {
    const response_http = await fetch(`${url_backend}/api/auth/resend-verification`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    });

    const response_body = await response_http.json();
    if (!response_body.ok) {
        const error = new Error(response_body.message);
        error.code = response_body.code || null;
        throw error;
    }
    return response_body;
};

/* 
JSON.stringify sirve para transformar un Objeto de JS en un JSON
*/