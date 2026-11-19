import { useEffect, useRef, useState } from "react";

export function useDropdown(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);
    const dropdownRef = useRef(null);

    const toggle = () => setIsOpen((prev) => !prev);
    const close = () => setIsOpen(false);
    const open = () => setIsOpen(true);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return {
        isOpen,
        setIsOpen,
        toggle,
        close,
        open,
        dropdownRef
    };
}

export default useDropdown;
