import swaggerJsdoc from 'swagger-jsdoc';

// ───────────────────────────────────────────────────────────────
// Helpers de esquema
// ───────────────────────────────────────────────────────────────

/** ObjectId de MongoDB (hexadecimal de 24 caracteres) */
const objectId = {
    type: 'string',
    pattern: '^[0-9a-fA-F]{24}$',
    example: '65f1a2b3c4d5e6f7a8b9c0d1',
};

/**
 * Envoltorio de respuesta exitosa estándar del backend:
 * { ok: true, status, message, data }
 */
const successEnvelope = (dataSchema) => ({
    allOf: [
        {
            type: 'object',
            properties: {
                ok: { type: 'boolean', example: true },
                status: { type: 'integer', example: 200 },
                message: { type: 'string', example: 'Operación realizada correctamente.' },
                data: dataSchema ?? { nullable: true, example: null },
            },
            required: ['ok', 'status', 'message'],
        },
        ...(dataSchema ? [{ properties: { data } }] : []),
    ],
});

/**
 * Envoltorio de respuesta de error estándar del backend
 * (generado por ServerError / errorHandler.middleware):
 * { ok: false, status, code, message, errors? }
 */
const errorEnvelope = (code, message, withErrors = false) => ({
    type: 'object',
    properties: {
        ok: { type: 'boolean', example: false },
        status: { type: 'integer', example: 400 },
        code: code
            ? { type: 'string', nullable: true, example: code }
            : { type: 'string', nullable: true, example: null },
        message: { type: 'string', example: message },
        ...(withErrors
            ? {
                  errors: {
                      type: 'array',
                      items: { type: 'string' },
                      example: ['El campo email es obligatorio.'],
                      description: 'Detalle de los errores de validación de Mongoose.',
                  },
              }
            : {}),
    },
    required: ['ok', 'status', 'code', 'message'],
});

// ───────────────────────────────────────────────────────────────
// Schemas de entidades (derivados de src/models)
// ───────────────────────────────────────────────────────────────

/** Usuario tal como lo devuelve el login / GET /users/me (sin datos sensibles) */
const UserPublic = {
    type: 'object',
    properties: {
        userName: { type: 'string', example: 'juan_perez' },
        email: { type: 'string', format: 'email', example: 'juan@example.com' },
        createdAt: { type: 'string', format: 'date-time', example: '2026-01-15T10:30:00.000Z' },
    },
    required: ['userName', 'email'],
};

/** Documento completo de usuario (incluye password hasheado, como lo devuelve el registro) */
const UserFull = {
    type: 'object',
    properties: {
        _id: objectId,
        userName: { type: 'string', example: 'juan_perez' },
        email: { type: 'string', format: 'email', example: 'juan@example.com' },
        password: { type: 'string', description: 'Contraseña hasheada con bcrypt.', example: '$2b$10$Xk1...' },
        active: { type: 'boolean', example: true },
        emailVerified: { type: 'boolean', example: false },
        createdAt: { type: 'string', format: 'date-time', example: '2026-01-15T10:30:00.000Z' },
        updatedAt: { type: 'string', format: 'date-time', example: '2026-01-15T10:30:00.000Z' },
    },
};

/** Espacio de trabajo (modelo Workspace) */
const Workspace = {
    type: 'object',
    properties: {
        _id: objectId,
        name: { type: 'string', maxLength: 30, example: 'Equipo TP Final' },
        description: { type: 'string', maxLength: 200, example: 'Espacio de trabajo para el proyecto final' },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['_id', 'name'],
};

/** Resumen de workspace tal como lo devuelve GET /workspaces (vista de membresía) */
const WorkspaceSummary = {
    type: 'object',
    properties: {
        member_id: objectId,
        workspace_id: objectId,
        workspace_name: { type: 'string', example: 'Equipo TP Final' },
        workspace_description: { type: 'string', example: 'Espacio de trabajo para el proyecto final' },
        workspace_role: { type: 'string', enum: ['owner', 'admin', 'user'], example: 'owner' },
        workspace_creation_date: { type: 'string', format: 'date-time' },
        workspace_members_count: { type: 'integer', example: 4 },
    },
    required: ['member_id', 'workspace_id', 'workspace_name', 'workspace_role'],
};

/** Canal (modelo Channel) */
const Channel = {
    type: 'object',
    properties: {
        _id: objectId,
        name: { type: 'string', maxLength: 50, example: 'general' },
        description: { type: 'string', maxLength: 1000, example: 'Conversaciones generales del equipo' },
        id_workspace: objectId,
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['_id', 'name', 'description', 'id_workspace'],
};

/** Resumen de canal tal como lo devuelve GET /workspaces/{id} */
const ChannelSummary = {
    type: 'object',
    properties: {
        channel_id: objectId,
        channel_name: { type: 'string', example: 'general' },
        channel_description: { type: 'string', example: 'Conversaciones generales del equipo' },
        channel_creation_date: { type: 'string', format: 'date-time' },
        channel_updated_date: { type: 'string', format: 'date-time' },
        workspace_id: { oneOf: [objectId, { type: 'object' }], description: 'ID del workspace (puede venir poblado).' },
    },
    required: ['channel_id', 'channel_name', 'channel_description'],
};

/** Mensaje de canal (con el autor poblado como {_id, userName}) */
const ChannelMessage = {
    type: 'object',
    properties: {
        _id: objectId,
        content: { type: 'string', example: 'Hola equipo, ¿cómo están?' },
        id_channel: objectId,
        id_user: {
            oneOf: [
                {
                    type: 'object',
                    properties: {
                        _id: objectId,
                        userName: { type: 'string', example: 'juan_perez' },
                    },
                },
                objectId,
            ],
            description: 'Autor del mensaje, poblado con {_id, userName}.',
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['_id', 'content', 'id_channel'],
};

/** Miembro de un workspace (id_user poblado con {_id, userName, email} en GET /members) */
const Member = {
    type: 'object',
    properties: {
        _id: objectId,
        id_user: {
            oneOf: [
                {
                    type: 'object',
                    properties: {
                        _id: objectId,
                        userName: { type: 'string', example: 'juan_perez' },
                        email: { type: 'string', format: 'email', example: 'juan@example.com' },
                    },
                },
                objectId,
            ],
            description: 'Usuario miembro (poblado en GET /members).',
        },
        id_workspace: objectId,
        role: { type: 'string', enum: ['admin', 'user', 'owner'], example: 'user' },
        active: { type: 'boolean', example: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['_id', 'id_user', 'id_workspace', 'role'],
};

/** Invitación a un workspace (modelo Invitation) */
const Invitation = {
    type: 'object',
    properties: {
        _id: objectId,
        id_invitedUser: objectId,
        id_workspace: objectId,
        role: { type: 'string', enum: ['admin', 'user'], example: 'user' },
        active: { type: 'boolean', example: true },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['_id', 'id_invitedUser', 'id_workspace', 'role'],
};

/** Mensaje directo (emisor y receptor poblados con {_id, userName}) */
const DirectMessage = {
    type: 'object',
    properties: {
        _id: objectId,
        content: { type: 'string', example: '¿Nos juntamos mañana para el TP?' },
        id_sender: {
            oneOf: [
                {
                    type: 'object',
                    properties: { _id: objectId, userName: { type: 'string', example: 'juan_perez' } },
                },
                objectId,
            ],
            description: 'Usuario emisor (poblado en GET /directMessages/{user_id}).',
        },
        id_receiver: {
            oneOf: [
                {
                    type: 'object',
                    properties: { _id: objectId, userName: { type: 'string', example: 'maria_gomez' } },
                },
                objectId,
            ],
            description: 'Usuario receptor (poblado en GET /directMessages/{user_id}).',
        },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
    },
    required: ['_id', 'content'],
};

/** Resumen de conversación (GET /directMessages) */
const Conversation = {
    type: 'object',
    properties: {
        contact: {
            type: 'object',
            properties: {
                _id: objectId,
                userName: { type: 'string', example: 'maria_gomez' },
                email: { type: 'string', format: 'email', example: 'maria@example.com' },
            },
            required: ['_id', 'userName', 'email'],
        },
        lastMessage: { type: 'string', example: '¿Nos juntamos mañana para el TP?' },
        lastMessageAt: { type: 'string', format: 'date-time' },
    },
    required: ['contact', 'lastMessage', 'lastMessageAt'],
};

/** Login exitoso: token JWT + usuario público */
const LoginData = {
    type: 'object',
    properties: {
        auth_token: {
            type: 'string',
            description: 'Token JWT para autenticar las siguientes peticiones vía header Authorization: Bearer.',
            example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
        user: UserPublic,
    },
    required: ['auth_token', 'user'],
};

// ───────────────────────────────────────────────────────────────
// Responses reutilizables
// ───────────────────────────────────────────────────────────────

const Unauthorized401 = {
    description:
        'No autorizado: falta el header Authorization, el token es inválido o expiró. ' +
        'Códigos posibles: UNAUTHORIZED, TOKEN_EXPIRED, INVALID_TOKEN.',
    content: {
        'application/json': {
            schema: errorEnvelope('UNAUTHORIZED', 'No autorizado. Credenciales de autenticación inválidas o ausentes.'),
            examples: {
                missing_token: {
                    summary: 'Token ausente o malformado',
                    value: {
                        ok: false,
                        status: 401,
                        code: 'UNAUTHORIZED',
                        message: 'No autorizado. Credenciales de autenticación inválidas o ausentes.',
                    },
                },
                expired_token: {
                    summary: 'Token expirado',
                    value: {
                        ok: false,
                        status: 401,
                        code: 'TOKEN_EXPIRED',
                        message:
                            'La sesión o el enlace ha expirado. Por favor, solicita uno nuevo o vuelve a iniciar sesión.',
                    },
                },
                invalid_token: {
                    summary: 'Token inválido (firma incorrecta o malformado)',
                    value: {
                        ok: false,
                        status: 401,
                        code: 'INVALID_TOKEN',
                        message: 'No autorizado. Las credenciales o el enlace proporcionado no son válidos.',
                    },
                },
            },
        },
    },
};

const Forbidden403 = {
    description:
        'Prohibido: el usuario no es miembro del workspace o no tiene el rol requerido (owner/admin según el endpoint).',
    content: {
        'application/json': {
            schema: errorEnvelope(null, 'No tienes permisos para realizar esta operación.'),
            examples: {
                not_member: {
                    summary: 'No es miembro del workspace',
                    value: {
                        ok: false,
                        status: 403,
                        code: null,
                        message: 'No tienes permisos para acceder a este espacio de trabajo.',
                    },
                },
                insufficient_role: {
                    summary: 'Rol insuficiente',
                    value: {
                        ok: false,
                        status: 403,
                        code: null,
                        message: 'No tienes permisos suficientes para realizar esta operación.',
                    },
                },
            },
        },
    },
};

const InvalidId400 = {
    description: 'El identificador proporcionado en la URL no es un ObjectId de MongoDB válido (code: INVALID_ID).',
    content: {
        'application/json': {
            schema: errorEnvelope('INVALID_ID', 'El identificador proporcionado no tiene un formato válido.'),
            example: {
                ok: false,
                status: 400,
                code: 'INVALID_ID',
                message: 'El identificador proporcionado no tiene un formato válido.',
            },
        },
    },
};

const ValidationError400 = {
    description: 'Los datos enviados no cumplen el esquema de Mongoose (code: VALIDATION_ERROR).',
    content: {
        'application/json': {
            schema: errorEnvelope('VALIDATION_ERROR', 'Los datos enviados no cumplen con el formato requerido.', true),
            example: {
                ok: false,
                status: 400,
                code: 'VALIDATION_ERROR',
                message: 'Los datos enviados no cumplen con el formato requerido.',
                errors: ['El nombre es obligatorio.'],
            },
        },
    },
};

const InvalidJson400 = {
    description: 'El body enviado no es un JSON válido (error de sintaxis).',
    content: {
        'application/json': {
            schema: errorEnvelope(null, 'El formato JSON enviado es inválido. Verifica comillas y sintaxis.'),
            example: {
                ok: false,
                status: 400,
                message: 'El formato JSON enviado es inválido. Verifica comillas y sintaxis.',
            },
        },
    },
};

const NotFound404 = {
    description: 'El recurso solicitado no existe.',
    content: {
        'application/json': {
            schema: errorEnvelope(null, 'Recurso no encontrado.'),
            example: { ok: false, status: 404, code: null, message: 'Recurso no encontrado.' },
        },
    },
};

const ServerError500 = {
    description: 'Error interno del servidor (code: INTERNAL_SERVER_ERROR).',
    content: {
        'application/json': {
            schema: errorEnvelope('INTERNAL_SERVER_ERROR', 'Ocurrió un error interno en el servidor. Inténtalo de nuevo más tarde.'),
            example: {
                ok: false,
                status: 500,
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Ocurrió un error interno en el servidor. Inténtalo de nuevo más tarde.',
            },
        },
    },
};

/** Genera una respuesta 400 de negocio (error controlado por ServerError) */
const BadRequest400 = (message, code = null) => ({
    description: `Error controlado del backend: ${message}`,
    content: {
        'application/json': {
            schema: errorEnvelope(code, message),
            example: { ok: false, status: 400, code, message },
        },
    },
});

// ───────────────────────────────────────────────────────────────
// Definición OpenAPI
// ───────────────────────────────────────────────────────────────

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.3',
        info: {
            title: 'Slack Clone API',
            version: '1.0.0',
            description:
                'API REST del clon de Slack (TP Final UTN). ' +
                'Endpoints de autenticación, usuarios, workspaces, canales, mensajes de canal, miembros y mensajes directos. ' +
                'Todas las respuestas usan un envoltorio común: éxito `{ ok: true, status, message, data }` y error `{ ok: false, status, code, message, errors? }`.',
        },
        servers: [
            {
                url: 'http://localhost:{port}/api',
                description: 'Servidor local',
                variables: {
                    port: { default: '3000', description: 'Puerto del backend (variable de entorno PORT).' },
                },
            },
        ],
        tags: [
            { name: 'Auth', description: 'Registro, login, verificación de email y recuperación de contraseña.' },
            { name: 'Users', description: 'Perfil del usuario autenticado.' },
            { name: 'Workspaces', description: 'Espacios de trabajo y sus canales.' },
            { name: 'Channels', description: 'Canales dentro de un workspace.' },
            { name: 'Channel Messages', description: 'Mensajes dentro de un canal.' },
            { name: 'Members', description: 'Miembros e invitaciones de un workspace.' },
            { name: 'Direct Messages', description: 'Mensajería directa entre usuarios.' },
            { name: 'Status', description: 'Healthcheck del servidor.' },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description:
                        'Token JWT obtenido de POST /api/auth/login. Enviar como header `Authorization: Bearer <token>`.',
                },
            },
            schemas: {
                /**
                 * Envoltorio genérico de éxito: { ok: true, status, message, data }
                 * (data puede ser cualquier objeto o null; los endpoints la tipifican con allOf).
                 */
                SuccessEnvelope: {
                    type: 'object',
                    properties: {
                        ok: { type: 'boolean', example: true },
                        status: { type: 'integer', example: 200 },
                        message: { type: 'string', example: 'Operación realizada correctamente.' },
                        data: {
                            description: 'Carga útil de la respuesta. Su forma depende del endpoint.',
                            nullable: true,
                        },
                    },
                    required: ['ok', 'status', 'message'],
                },
                /** Envoltorio genérico de error: { ok: false, status, code, message, errors? } */
                ErrorEnvelope: errorEnvelope(),
                /** Error de validación de Mongoose (incluye el array `errors`). */
                ValidationError: errorEnvelope('VALIDATION_ERROR', 'Los datos enviados no cumplen con el formato requerido.', true),
                /** Body JSON malformado (SyntaxError capturado por jsonError.middleware). */
                InvalidJson: {
                    type: 'object',
                    properties: {
                        ok: { type: 'boolean', example: false },
                        status: { type: 'integer', example: 400 },
                        message: { type: 'string', example: 'El formato JSON enviado es inválido. Verifica comillas y sintaxis.' },
                    },
                    required: ['ok', 'status', 'message'],
                },
                UserPublic,
                UserFull,
                Workspace,
                WorkspaceSummary,
                Channel,
                ChannelSummary,
                ChannelMessage,
                Member,
                Invitation,
                DirectMessage,
                Conversation,
                LoginData,
            },
            parameters: {
                /** Path param: ID del workspace */
                WorkspaceId: {
                    in: 'path',
                    name: 'workspace_id',
                    required: true,
                    description: 'ID del espacio de trabajo (ObjectId de MongoDB).',
                    schema: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
                    example: '65f1a2b3c4d5e6f7a8b9c0d2',
                },
                /** Path param: ID del canal */
                ChannelId: {
                    in: 'path',
                    name: 'channel_id',
                    required: true,
                    description: 'ID del canal (ObjectId de MongoDB).',
                    schema: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
                    example: '65f1a2b3c4d5e6f7a8b9c0d4',
                },
                /** Path param: ID del mensaje de canal */
                MessageId: {
                    in: 'path',
                    name: 'message_id',
                    required: true,
                    description: 'ID del mensaje de canal (ObjectId de MongoDB).',
                    schema: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
                    example: '65f1a2b3c4d5e6f7a8b9c0d5',
                },
                /** Path param: ID de la membresía */
                MemberId: {
                    in: 'path',
                    name: 'member_id',
                    required: true,
                    description: 'ID de la membresía (ObjectId de MongoDB).',
                    schema: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
                    example: '65f1a2b3c4d5e6f7a8b9c0d1',
                },
                /** Path param: ID del usuario (contacto de mensaje directo) */
                UserId: {
                    in: 'path',
                    name: 'user_id',
                    required: true,
                    description: 'ID del usuario destinatario/contacto (ObjectId de MongoDB).',
                    schema: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' },
                    example: '65f1a2b3c4d5e6f7a8b9c0d6',
                },
            },
            responses: {
                Unauthorized401,
                Forbidden403,
                InvalidId400,
                ValidationError400,
                InvalidJson400,
                NotFound404,
                ServerError500,
            },
        },
        paths: {
            // Healthcheck (definido en main.js, fuera de los routers)
            '/status': {
                get: {
                    tags: ['Status'],
                    summary: 'Healthcheck del servidor',
                    description: 'Verifica que el servidor Express esté corriendo. No requiere autenticación.',
                    security: [],
                    responses: {
                        200: {
                            description: 'Servidor funcionando correctamente.',
                            content: {
                                'application/json': {
                                    schema: successEnvelope(),
                                    example: {
                                        ok: true,
                                        status: 200,
                                        message: 'Express Server OK!',
                                        data: null,
                                    },
                                },
                            },
                        },
                        500: ServerError500,
                    },
                },
            },
        },
    },
    // Los endpoints se documentan con comentarios JSDoc en src/routes/*.js
    apis: ['./src/routes/*.js'],
});

export default swaggerSpec;
