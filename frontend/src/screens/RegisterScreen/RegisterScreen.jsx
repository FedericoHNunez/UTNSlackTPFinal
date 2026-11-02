

import useRequest from '../../hooks/useRequest'
import useForm from '../../hooks/useForm'
import { register } from '../../services/authService'

export const RegisterScreen = () => {

  const initial_state = { email: '', password: '', userName: '' };
  const { formState, handleChangeInput } = useForm(initial_state);
  const { loading, responce, error, sendRequest } = useRequest();


  const HandleSubmit = (e) => {
    e.preventDefault()
    sendRequest(
      () => register(formState.email, formState.password, formState.userName)
    )

  }



  return (
    <>
      <div>RegisterScreen</div>

      <form onSubmit={HandleSubmit} >
        <div>
          <label
            htmlFor="email">Email
          </label>
          <input
            name="email"
            id="email"
            type="email"
            value={formState.email}
            onChange={handleChangeInput}

          />

        </div>
        <div>
          <label
            htmlFor="userName">User Name
          </label>
          <input
            name="userName"
            id="userName"
            type="text"
            maxLength={50}
            value={formState.userName}
            onChange={handleChangeInput}

          />

        </div>
        <div>
          <label
            htmlFor="password">Password
          </label>
          <input
            name="password"
            id="password"
            type="password"
            value={formState.password}
            onChange={handleChangeInput}

          />
        </div>
        <button
          type="submit">
          {
            loading ?
              <span>Enviando...</span> :
              <span>Enviar</span>
          }
        </button>
        {
          error && !loading && <span style={{ color: 'red' }}>{error}</span>
        }
        {
          responce && !loading && <span style={{ color: 'greenyellow' }}>Registro exitoso</span>
        }



      </form>
    </>

  )


}

export default RegisterScreen