import express from 'express';
import workspaceController from '../controllers/workspace.controller.js';
import channelRouter from './channel.router.js';
import workSpaceMiddleware from '../middlewares/workSpace.middleware.js';
import memberRouter from './member.router.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import directMessageRouter from './directMessage.router.js';

const workspaceRouter = express.Router();

// Direct messages
workspaceRouter.use('/:workspace_id/directMessages',
     authMiddleware,
     workSpaceMiddleware(['owner', 'admin', 'user']),
     directMessageRouter);


// Channels sub-router
workspaceRouter.use('/:workspace_id/channels',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin', 'user']),
    channelRouter);

//members sub-router
workspaceRouter.use('/:workspace_id/members',
    memberRouter);


workspaceRouter.get('/',
    authMiddleware,
    workspaceController.getWorkspacesByUserId);
/**
 * @openapi
 * /workspaces:
 *   get:
 *     tags: [Workspaces]
 *     summary: Listar los workspaces del usuario autenticado
 *     description: >
 *       Devuelve todos los espacios de trabajo donde el usuario autenticado es miembro,
 *       con su rol y la cantidad de miembros de cada uno.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Espacios de trabajo obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         workspaces:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/WorkspaceSummary'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Espacios de trabajo obtenidos correctamente.
 *               data:
 *                 workspaces:
 *                   - member_id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                     workspace_id: 65f1a2b3c4d5e6f7a8b9c0d2
 *                     workspace_name: Equipo TP Final
 *                     workspace_description: Espacio de trabajo para el proyecto final
 *                     workspace_role: owner
 *                     workspace_creation_date: 2026-01-15T10:30:00.000Z
 *                     workspace_members_count: 4
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       404:
 *         description: El usuario del token no existe en la base de datos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 404
 *               code: null
 *               message: Usuario no encontrado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
workspaceRouter.post('/',
    authMiddleware,
    workspaceController.createWorkspace);
/**
 * @openapi
 * /workspaces:
 *   post:
 *     tags: [Workspaces]
 *     summary: Crear un workspace
 *     description: >
 *       Crea un nuevo espacio de trabajo y registra al usuario autenticado como `owner`.
 *       Además, se crean automáticamente tres canales de ejemplo: `informal`, `nuevo-canal` y `todo-ejemplo`.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, description]
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 30
 *                 description: Nombre del workspace (máximo 30 caracteres).
 *                 example: Equipo TP Final
 *               description:
 *                 type: string
 *                 maxLength: 200
 *                 description: Descripción del workspace (máximo 200 caracteres).
 *                 example: Espacio de trabajo para el proyecto final
 *     responses:
 *       201:
 *         description: Workspace creado correctamente (con el usuario como owner).
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         workspace:
 *                           $ref: '#/components/schemas/Workspace'
 *                         member:
 *                           $ref: '#/components/schemas/Member'
 *             example:
 *               ok: true
 *               status: 201
 *               message: Espacio de trabajo creado correctamente.
 *               data:
 *                 workspace:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d2
 *                   name: Equipo TP Final
 *                   description: Espacio de trabajo para el proyecto final
 *                   createdAt: 2026-01-15T10:30:00.000Z
 *                   updatedAt: 2026-01-15T10:30:00.000Z
 *                 member:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                   id_user: 65f1a2b3c4d5e6f7a8b9c0d3
 *                   id_workspace: 65f1a2b3c4d5e6f7a8b9c0d2
 *                   role: owner
 *                   active: true
 *       400:
 *         description: Faltan el nombre o la descripción, JSON malformado, o error de validación de Mongoose.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorEnvelope'
 *                 - $ref: '#/components/schemas/ValidationError'
 *                 - $ref: '#/components/schemas/InvalidJson'
 *             examples:
 *               campos_faltantes:
 *                 summary: Faltan campos obligatorios
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El nombre y la descripción del espacio de trabajo son obligatorios.
 *               json_malformado:
 *                 summary: JSON con sintaxis inválida
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   message: El formato JSON enviado es inválido. Verifica comillas y sintaxis.
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
//solo ownwer
workspaceRouter.delete('/:workspace_id',
    authMiddleware,
    workSpaceMiddleware(['owner']),
    workspaceController.deleteWorkspaceById);
/**
 * @openapi
 * /workspaces/{workspace_id}:
 *   delete:
 *     tags: [Workspaces]
 *     summary: Eliminar un workspace (solo owner)
 *     description: >
 *       Elimina el workspace junto con sus canales, mensajes de canal y membresías.
 *       Requiere ser el propietario (`owner`) del workspace.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *     responses:
 *       200:
 *         description: Workspace eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         result:
 *                           type: object
 *                           properties:
 *                             deletedWorkspace:
 *                               $ref: '#/components/schemas/Workspace'
 *                             deletedMembers:
 *                               type: object
 *                               description: Resultado de deleteMany de las membresías.
 *                             deletedMessages:
 *                               type: object
 *                               description: Resultado de deleteMany de los mensajes de canal.
 *             example:
 *               ok: true
 *               status: 200
 *               message: Espacio de trabajo eliminado correctamente.
 *               data:
 *                 result:
 *                   deletedWorkspace:
 *                     _id: 65f1a2b3c4d5e6f7a8b9c0d2
 *                     name: Equipo TP Final
 *                     description: Espacio de trabajo para el proyecto final
 *                   deletedMembers:
 *                     acknowledged: true
 *                     deletedCount: 4
 *                   deletedMessages:
 *                     acknowledged: true
 *                     deletedCount: 12
 *       400:
 *         $ref: '#/components/responses/InvalidId400'
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       403:
 *         $ref: '#/components/responses/Forbidden403'
 *       404:
 *         description: El workspace no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 404
 *               code: null
 *               message: Espacio de trabajo no encontrado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
//solo ownwer y admin
workspaceRouter.put('/:workspace_id',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin']),
    workspaceController.updateWorkspaceById);
/**
 * @openapi
 * /workspaces/{workspace_id}:
 *   put:
 *     tags: [Workspaces]
 *     summary: Actualizar un workspace (owner o admin)
 *     description: Actualiza el nombre y/o la descripción del workspace. Requiere rol `owner` o `admin`.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 30
 *                 example: Equipo TP Final - Renombrado
 *               description:
 *                 type: string
 *                 maxLength: 200
 *                 example: Nueva descripción del espacio
 *     responses:
 *       200:
 *         description: Workspace actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         workspace:
 *                           $ref: '#/components/schemas/Workspace'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Espacio de trabajo actualizado correctamente.
 *               data:
 *                 workspace:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d2
 *                   name: Equipo TP Final - Renombrado
 *                   description: Nueva descripción del espacio
 *                   createdAt: 2026-01-15T10:30:00.000Z
 *                   updatedAt: 2026-11-17T12:00:00.000Z
 *       400:
 *         description: ID de workspace faltante o inválido, o error de validación de Mongoose.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorEnvelope'
 *                 - $ref: '#/components/schemas/ValidationError'
 *             examples:
 *               id_invalido:
 *                 summary: ObjectId inválido en la URL
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado no tiene un formato válido.
 *               validacion_mongoose:
 *                 summary: No cumple el esquema de Mongoose (ej. nombre > 30 caracteres)
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: VALIDATION_ERROR
 *                   message: Los datos enviados no cumplen con el formato requerido.
 *                   errors: ["Path `name` (`...`) is longer than the maximum allowed length (30)."]
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       403:
 *         $ref: '#/components/responses/Forbidden403'
 *       404:
 *         description: El workspace no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 404
 *               code: null
 *               message: Espacio de trabajo no encontrado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
workspaceRouter.get('/:workspace_id/search',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin', 'user']),
    workspaceController.searchInWorkspace);
/**
 * @openapi
 * /workspaces/{workspace_id}/search:
 *   get:
 *     tags: [Workspaces]
 *     summary: Buscar canales, miembros y mensajes dentro de un workspace
 *     description: >
 *       Busca coincidencias por texto en canales (nombre y descripción), miembros (nombre y email),
 *       mensajes activos de los canales del workspace y mensajes directos del usuario autenticado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *       - in: query
 *         name: q
 *         required: false
 *         schema:
 *           type: string
 *         description: Texto a buscar dentro del espacio de trabajo.
 *     responses:
 *       200:
 *         description: Búsqueda realizada correctamente.
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       403:
 *         $ref: '#/components/responses/Forbidden403'
 *       404:
 *         description: El workspace no existe.
 */
workspaceRouter.get('/:workspace_id',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin', 'user']),
    workspaceController.getChannelsByWorkspaceId);
/**
 * @openapi
 * /workspaces/{workspace_id}:
 *   get:
 *     tags: [Workspaces]
 *     summary: Listar los canales de un workspace
 *     description: >
 *       Devuelve todos los canales del workspace indicado.
 *       Cualquier miembro del workspace (owner, admin o user) puede consultarlo.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *     responses:
 *       200:
 *         description: Canales obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         channels:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/ChannelSummary'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Canales obtenidos correctamente.
 *               data:
 *                 channels:
 *                   - channel_id: 65f1a2b3c4d5e6f7a8b9c0d4
 *                     channel_name: informal
 *                     channel_description: Conversaciones en Social
 *                     channel_creation_date: 2026-01-15T10:30:00.000Z
 *                     channel_updated_date: 2026-01-15T10:30:00.000Z
 *                     workspace_id: 65f1a2b3c4d5e6f7a8b9c0d2
 *       400:
 *         $ref: '#/components/responses/InvalidId400'
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       403:
 *         $ref: '#/components/responses/Forbidden403'
 *       404:
 *         description: El workspace no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 404
 *               code: null
 *               message: Espacio de trabajo no encontrado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
//invitar a nuevos usuarios
workspaceRouter.post('/invite-new-user',
    authMiddleware,
    workspaceController.inviteNewUser);
/**
 * @openapi
 * /workspaces/invite-new-user:
 *   post:
 *     tags: [Workspaces]
 *     summary: Invitar a la plataforma a un usuario nuevo (por email)
 *     description: >
 *       Envía un email de invitación a registrarse en la plataforma a un usuario que aún no tiene cuenta.
 *       El destinatario no debe estar registrado previamente.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: invitado@example.com
 *     responses:
 *       200:
 *         description: Invitación enviada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Invitación enviada correctamente.
 *               data: null
 *       400:
 *         description: Email faltante, formato inválido, o el usuario ya está registrado en la plataforma.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               email_faltante:
 *                 summary: Falta el email
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El correo electrónico es obligatorio.
 *               email_invalido:
 *                 summary: Formato de email inválido
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El formato del correo electrónico no es válido.
 *               ya_registrado:
 *                 summary: El usuario ya tiene cuenta
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El usuario ya se encuentra registrado en la plataforma. Puedes invitarlo directamente al espacio de trabajo.
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
export default workspaceRouter;
