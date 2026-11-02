import React from 'react'
import { Link } from 'react-router'
import './HomeScreen.css'

export const HomeScreen = () => {
  return (
    <div className="home-container">
      <header className="home-navbar">
        <Link to="/" className="home-logo">
          <div className="home-logo-icon">
            <span className="dot dot-blue"></span>
            <span className="dot dot-green"></span>
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
          </div>
          <span>slack</span>
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

      <main className="home-hero">
        <div className="home-hero-content">
          <h1>
            Pensado para las personas.{' '}
            <span className="home-hero-highlight">Creado para la productividad.</span>
          </h1>
          <p>
            Conectá con tu equipo, organizá tus conversaciones en canales y llevá adelante tus proyectos en un solo lugar.
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

        <div className="home-mockup">
          <div className="mockup-header">
            <span className="mockup-circle dot-red"></span>
            <span className="mockup-circle dot-yellow"></span>
            <span className="mockup-circle dot-green"></span>
          </div>
          <div className="mockup-body">
            <div className="mockup-sidebar">
              <div className="mockup-workspace-title">UTN Workspace</div>
              <div className="mockup-channel active"># general</div>
              <div className="mockup-channel"># completar-tareas</div>
              <div className="mockup-channel"># entregas-tp</div>
            </div>
            <div className="mockup-chat">
              <div className="mockup-msg">
                <div className="mockup-avatar dot-blue">A</div>
                <div className="mockup-msg-text">
                  <strong>Ana</strong>
                  <span>¡Bienvenidos al nuevo espacio de trabajo del equipo! 🚀</span>
                </div>
              </div>
              <div className="mockup-msg">
                <div className="mockup-avatar dot-green">M</div>
                <div className="mockup-msg-text">
                  <strong>Martín</strong>
                  <span>Ya quedaron creados los canales para el TP Final.</span>
                </div>
              </div>
              <div className="mockup-msg">
                <div className="mockup-avatar dot-red">L</div>
                <div className="mockup-msg-text">
                  <strong>Lucía</strong>
                  <span>¡Excelente! Ahí me sumo a #completar-tareas 🙌</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomeScreen
