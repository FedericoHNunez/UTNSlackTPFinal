import React from "react";
import { Link } from "react-router";
import { SlackLogo } from "../Ui/SlackLogo.jsx";
import "./HomeNavbar.css";

export const HomeNavbar = () => {
  return (
    <header className="home-navbar">
      <Link to="/" className="home-logo">
        <SlackLogo color="white" />
      </Link>

      <nav className="home-nav-actions">
        <Link to="/login" className="btn-nav-login">
          Iniciar sesión
        </Link>
        <Link to="/register" className="btn-nav-register">
          Registrarse
        </Link>
      </nav>
    </header>
  );
};

export default HomeNavbar;

