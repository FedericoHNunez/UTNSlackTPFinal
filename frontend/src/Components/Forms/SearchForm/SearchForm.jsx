import "./SearchForm.css";

export const SearchForm = ({ placeholder, value, onChange }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form role="search" className="search-form" onSubmit={handleSubmit}>
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
                type="search"
                aria-label="Buscar"
                placeholder={placeholder}
                className="search-form-input"
                value={value}
                onChange={onChange}
            />
        </form>
    );
};
