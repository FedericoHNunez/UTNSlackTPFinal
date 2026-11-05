import { Link } from "react-router";

export default function WorkspaceNavbar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/channels">Channels</Link>
                </li>
                <li>
                    <Link to="/direct">Direct Messages</Link>
                </li>
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
            </ul>
        </nav>
    );
}