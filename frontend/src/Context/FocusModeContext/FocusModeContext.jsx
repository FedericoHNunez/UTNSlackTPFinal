import { createContext } from "react";

export const FocusModeContext = createContext({
    isFocusMode: false,
    toggleFocusMode: () => {}
});
