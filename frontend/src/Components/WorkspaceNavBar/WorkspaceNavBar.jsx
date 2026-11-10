import { Link } from "react-router";

export default function WorkspaceNavbar() {
    return (
        <>
            <div>
                <ul>
                    <li>
                        <button>W</button>
                    </li>
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
        </>
    );
}