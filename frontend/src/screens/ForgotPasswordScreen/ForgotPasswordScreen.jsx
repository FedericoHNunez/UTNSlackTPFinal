import useForm from "../../hooks/useForm.js";
import useRequest from "../../hooks/useRequest.js";
import { resetPassword } from "../../services/authService.js";

export const ForgotPasswordScreen = () => {
    const initial_form = { email: "" };
    const { formState, handleChangeInput } = useForm(initial_form);
    const { loading, error, response, sendRequest } = useRequest();

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(formState.email);
        sendRequest(() => resetPassword(formState.email));
    };

    return (
        <>
            <h1>Recuperar contraseña</h1>

            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChangeInput}
                />
                <button type="submit" disabled={loading}>
                    {loading ? "Enviando..." : "Enviar"}
                </button>
            </form>
        </>
    );
};
