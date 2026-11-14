import "./SearchForm.css";

export const SearchForm = ({placeholder}) => {
    return (
        <form role="search" className="search-form">
            <input
                type="search"
                aria-label="Buscar"
                placeholder={placeholder}
                className="search-form-input"
            />
            <button type="submit" className="search-form-btn">
                <img alt="Buscar" />
            </button>
        </form>
    );
};
