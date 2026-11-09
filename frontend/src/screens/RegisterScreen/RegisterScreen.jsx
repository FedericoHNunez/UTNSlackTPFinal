import { Link } from "react-router";
import { SlackLogo } from "../../Components/Ui/SlackLogo.jsx";
import { RegisterForm } from "../../Components/Forms/RegisterForm/RegisterForm.jsx";
import "./RegisterScreen.css";

export const RegisterScreen = () => {
  return (

    <div className="register-page">
      <header className="register-header">
        <Link to="/" className="register-logo">
          <SlackLogo color="black" />
        </Link>
        <h1>Crea tu cuenta en Slack</h1>
        <p className="register-subtitle">
          Te sugerimos que uses la{" "}
          <strong>
            dirección de correo electrónico que usas en el trabajo
          </strong>
          .
        </p>
      </header>

      <main className="register-card">
        <RegisterForm />

        <div className="register-footer">
          <p>
            ¿Ya usas Slack?
            <Link to="/login" className="register-footer-link">
              Iniciar sesión
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default RegisterScreen;
