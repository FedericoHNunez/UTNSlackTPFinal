export const APP_FEATURES = [
    {
        id: "channels",
        title: "Organizá conversaciones en #canales",
        description:
            "Creá canales temáticos para cada materia, entrega o equipo de trabajo y mantené cada proyecto ordenado en su propio espacio.",
        accent: "blue",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="9" x2="20" y2="9" />
                <line x1="4" y1="15" x2="20" y2="15" />
                <line x1="10" y1="3" x2="8" y2="21" />
                <line x1="16" y1="3" x2="14" y2="21" />
            </svg>
        )
    },
    {
        id: "messages",
        title: "Mensajería instantánea y colaborativa",
        description:
            "Enviá mensajes en tiempo real, compartí avances, resolvé dudas rápidamente y mantené a todo el equipo sincronizado.",
        accent: "green",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
        )
    },
    {
        id: "members",
        title: "Gestión de equipos e invitaciones",
        description:
            "Invitá nuevos compañeros por correo electrónico a tu espacio de trabajo y consultá la lista de miembros activos en cualquier momento.",
        accent: "yellow",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        )
    },
    {
        id: "search",
        title: "Búsqueda rápida y múltiples espacios",
        description:
            "Filtrá canales al instante desde el buscador lateral y alterná fácilmente entre todos tus espacios de trabajo de UTN Slack.",
        accent: "red",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        )
    }
];

export const DM_FEATURES = [
    {
        id: "one-on-one",
        title: "Conversaciones 1 a 1 en privado",
        description:
            "Escribile directamente a cualquier miembro de tu espacio de trabajo para resolver dudas puntuales o coordinar tareas.",
        accent: "blue",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
        )
    },
    {
        id: "history",
        title: "Historial siempre disponible",
        description:
            "Todos los mensajes directos quedan guardados y ordenados cronológicamente para que puedas retomar cualquier charla.",
        accent: "green",
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9" />
                <polyline points="12 7 12 12 15.5 12" />
            </svg>
        )
    }
];
