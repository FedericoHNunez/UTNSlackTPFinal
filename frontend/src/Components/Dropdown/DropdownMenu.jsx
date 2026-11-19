import "./DropdownMenu.css";

export function DropdownMenu({ isOpen, position = "bottom-right", className = "", children }) {
    return (
        <div
            className={`dropdown-menu dropdown-menu--${position} ${isOpen ? "is-open" : ""} ${className}`.trim()}
            role="menu"
            aria-hidden={!isOpen}
        >
            {children}
        </div>
    );
}

export function DropdownItem({ variant = "default", onClick, children }) {
    return (
        <button
            type="button"
            className={`dropdown-menu-item ${
                variant === "danger" ? "dropdown-menu-item--danger" : ""
            }`.trim()}
            role="menuitem"
            onClick={onClick}
        >
            {children}
        </button>
    );
}

export function DropdownDivider() {
    return <div className="dropdown-menu-divider" role="separator" />;
}

export default DropdownMenu;
