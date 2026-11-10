import React from "react";
import { Link } from "react-router";
import "./HomeHeroContent.css";

export const HomeHeroContent = () => {
  return (
    <div className="home-hero-content">
      <h1>
        Pensado para las personas.{" "}
        <span className="home-hero-highlight">
          Creado para la productividad.
        </span>
      </h1>
      <p>
        Conectá con tu equipo, organizá tus conversaciones en canales y llevá
        adelante tus proyectos en un solo lugar.
      </p>

      <div className="home-cta-group">
        <Link to="/register" className="btn-primary">
          Crear cuenta gratis
        </Link>
        <Link to="/login" className="btn-secondary">
          Iniciar sesión
        </Link>
      </div>
    </div>
  );
};

export default HomeHeroContent;

