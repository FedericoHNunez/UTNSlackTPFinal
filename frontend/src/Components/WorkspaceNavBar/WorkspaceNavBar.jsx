import { Link } from "react-router";

export default function WorkspaceNavbar() {
    return (
        <>
            <header>
                <h1>W</h1>
            </header>
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link to="/">inicio</Link>
                        </li>
                        <li>
                            <Link to="/">Mensajes Directos</Link>
                        </li>
                        <li>
                            <Link to="/direct">Actividad</Link>
                        </li>
                        <li>
                            <Link to="/profile">Archivos</Link>
                        </li>
                        <li>
                            <Link to="/profile">Agentes y Herramientas</Link>
                        </li>
                        <li>
                            <Link to="/profile">Administrador</Link>
                        </li>
                    </ul>
                    <div>
                        <ul>
                            <li>
                                <button>Tema</button>
                            </li>
                            <li>
                                <p>Idioma</p>
                            </li>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    );
}