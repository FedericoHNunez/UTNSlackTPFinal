import "./SearchForm.css";

export const SearchForm = ({
    placeholder,
    value,
    onChange,
    onFocus,
    onKeyDown,
    onSubmit,
    onClear,
    inputRef,
    autoComplete = "off"
}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.(e);
    };

    const showCustomClear = Boolean(value) && typeof onClear === "function";

    return (
        <form
            role="search"
            className={`search-form ${showCustomClear ? "has-custom-clear" : ""}`.trim()}
            onSubmit={handleSubmit}
        >
            <button type="submit" className="search-form-btn" aria-label="Buscar">
                <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            </button>
            <input
                ref={inputRef}
                type="search"
                aria-label="Buscar"
                placeholder={placeholder}
                className="search-form-input"
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                onKeyDown={onKeyDown}
                autoComplete={autoComplete}
            />
            {showCustomClear && (
                <button
                    type="button"
                    className="search-form-clear-btn"
                    aria-label="Limpiar búsqueda"
                    title="Limpiar búsqueda"
                    onClick={onClear}
                >
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                    >
                        <line x1="18" y1="6" x2="6" y2="18" />
                        <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </button>
            )}
        </form>
    );
};
