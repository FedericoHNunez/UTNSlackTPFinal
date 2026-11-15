import "./SearchForm.css";

export const SearchForm = ({ placeholder, value, onChange }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <form role="search" className="search-form" onSubmit={handleSubmit}>
            <input
                type="search"
                aria-label="Buscar"
                placeholder={placeholder}
                className="search-form-input"
                value={value}
                onChange={onChange}
            />
            <button type="submit" className="search-form-btn">
                <img alt="Buscar" />
            </button>
        </form>
    );
};
