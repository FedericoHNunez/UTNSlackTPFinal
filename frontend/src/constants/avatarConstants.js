export const AVATAR_COLORS = [
    "#2EB67D",
    "#36C5F0",
    "#E8912D",
    "#E01E5A",
    "#7C3AED",
    "#2563EB",
    "#0D9488",
    "#D97706",
    "#DB2777",
    "#4F46E5"
];

export const AVATAR_THEMES = [
    "workspace-avatar-theme-1",
    "workspace-avatar-theme-2",
    "workspace-avatar-theme-3"
];

export const getAvatarColor = (seed = "", index = 0) => {
    if (!seed) {
        return AVATAR_COLORS[index % AVATAR_COLORS.length];
    }
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const colorIndex = Math.abs(hash + index) % AVATAR_COLORS.length;
    return AVATAR_COLORS[colorIndex];
};
