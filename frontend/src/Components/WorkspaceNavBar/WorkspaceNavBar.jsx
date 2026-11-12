import { useState } from "react";
import { Link } from "react-router";
import "./WorkspaceNavBar.css";

export default function WorkspaceNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleCloseMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <button
                type="button"
                className={`workspace-navbar-toggle ${isMenuOpen ? "is-open" : ""}`}
                aria-label={isMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
                aria-expanded={isMenuOpen}
                onClick={() => setIsMenuOpen((prev) => !prev)}
            >
                <span className="workspace-navbar-burger-line" />
                <span className="workspace-navbar-burger-line" />
                <span className="workspace-navbar-burger-line" />
            </button>

            {isMenuOpen && (
                <div
                    className="workspace-navbar-backdrop"
                    onClick={handleCloseMenu}
                    aria-hidden="true"
                />
            )}

            <div className={`workspace-navbar-menu ${isMenuOpen ? "is-open" : ""}`}>
                <div className="workspace-navbar-group">
                    <ul className="workspace-navbar-list" onClick={handleCloseMenu}>
                        <li className="workspace-navbar-item">
                            <button type="button" className="workspace-navbar-avatar-btn">
                                W
                            </button>
                        </li>
                        <li className="workspace-navbar-item">
                            <Link to="/" className="workspace-navbar-link">
                                inicio
                            </Link>
                        </li>
                        <li className="workspace-navbar-item">
                            <Link to="/" className="workspace-navbar-link">
                                Mensajes Directos
                            </Link>
                        </li>
                        <li className="workspace-navbar-item">
                            <Link to="/direct" className="workspace-navbar-link">
                                Actividad
                            </Link>
                        </li>
                        <li className="workspace-navbar-item">
                            <Link to="/profile" className="workspace-navbar-link">
                                Archivos
                            </Link>
                        </li>
                        <li className="workspace-navbar-item">
                            <Link to="/profile" className="workspace-navbar-link">
                                Agentes y Herramientas
                            </Link>
                        </li>
                        <li className="workspace-navbar-item">
                            <Link to="/profile" className="workspace-navbar-link">
                                Administrador
                            </Link>
                        </li>
                    </ul>
                </div>

                <div className="workspace-navbar-group">
                    <ul className="workspace-navbar-list">
                        <li className="workspace-navbar-item">
                            <button type="button" className="workspace-navbar-btn">
                                Tema
                            </button>
                        </li>
                        <li className="workspace-navbar-item">
                            <p className="workspace-navbar-text">Idioma</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
}
