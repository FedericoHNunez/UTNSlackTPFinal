export function capitalizeFirstLetter(text = "") {
    if (!text || typeof text !== "string") return "";
    const trimmed = text.trim();
    if (!trimmed) return "";
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}

export function capitalizeListFields(list = [], fields = []) {
    if (!Array.isArray(list)) return [];
    return list.map((item) => {
        const formattedItem = { ...item };
        fields.forEach((field) => {
            if (formattedItem[field]) {
                formattedItem[field] = capitalizeFirstLetter(formattedItem[field]);
            }
        });
        return formattedItem;
    });
}

export default capitalizeFirstLetter;
