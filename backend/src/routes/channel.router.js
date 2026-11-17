import express from 'express';
import channelController from '../controllers/channel.controller.js';
import MessagesChannelRouter from './messagesChannel.router.js';
import channelMiddleware from '../middlewares/channel.middleware.js';

const channelRouter = express.Router({ mergeParams: true });

channelRouter.use('/:channel_id/messages', channelMiddleware, MessagesChannelRouter);

channelRouter.post('/', channelController.createChannel);
/**
 * @openapi
 * /workspaces/{workspace_id}/channels:
 *   post:
 *     tags: [Channels]
 *     summary: Crear un canal en un workspace
 *     description: >
 *       Crea un nuevo canal dentro del workspace indicado.
 *       Requiere ser miembro del workspace (owner, admin o user).
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
 *             required: [name, description]
 *             properties:
 *               name:
 *                 type: string
 *                 maxLength: 50
 *                 description: Nombre del canal (máximo 50 caracteres).
 *                 example: diseño
 *               description:
 *                 type: string
 *                 maxLength: 1000
 *                 description: Descripción del canal (máximo 1000 caracteres).
 *                 example: Canal para discutir temas de diseño
 *     responses:
 *       201:
 *         description: Canal creado correctamente.
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
 *                         channel:
 *                           $ref: '#/components/schemas/Channel'
 *             example:
 *               ok: true
 *               status: 201
 *               message: Canal creado correctamente.
 *               data:
 *                 channel:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d4
 *                   name: diseño
 *                   description: Canal para discutir temas de diseño
 *                   id_workspace: 65f1a2b3c4d5e6f7a8b9c0d2
 *                   createdAt: 2026-11-17T12:00:00.000Z
 *                   updatedAt: 2026-11-17T12:00:00.000Z
 *       400:
 *         description: Faltan el nombre o la descripción, ObjectId inválido, JSON malformado, o error de validación de Mongoose.
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
 *                   message: El nombre, la descripción y el espacio de trabajo son obligatorios.
 *               id_invalido:
 *                 summary: ObjectId inválido en la URL
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado no tiene un formato válido.
 *               json_malformado:
 *                 summary: JSON con sintaxis inválida
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   message: El formato JSON enviado es inválido. Verifica comillas y sintaxis.
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
channelRouter.get('/:channel_id', channelMiddleware, channelController.getMessagesByChannelId);
/**
 * @openapi
 * /workspaces/{workspace_id}/channels/{channel_id}:
 *   get:
 *     tags: [Channels]
 *     summary: Listar los mensajes de un canal
 *     description: >
 *       Devuelve los mensajes del canal indicado, ordenados del más antiguo al más reciente,
 *       con el autor poblado como `{_id, userName}`.
 *       Requiere ser miembro del workspace.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *       - $ref: '#/components/parameters/ChannelId'
 *     responses:
 *       200:
 *         description: Mensajes obtenidos correctamente.
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
 *                         messagesChannel:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/ChannelMessage'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Mensajes obtenidos correctamente.
 *               data:
 *                 messagesChannel:
 *                   - _id: 65f1a2b3c4d5e6f7a8b9c0d5
 *                     content: Hola equipo, ¿cómo están?
 *                     id_channel: 65f1a2b3c4d5e6f7a8b9c0d4
 *                     id_user:
 *                       _id: 65f1a2b3c4d5e6f7a8b9c0d3
 *                       userName: juan_perez
 *                     createdAt: 2026-11-17T12:00:00.000Z
 *                     updatedAt: 2026-11-17T12:00:00.000Z
 *       400:
 *         description: ObjectId inválido en la URL (workspace o canal).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 400
 *               code: INVALID_ID
 *               message: El identificador proporcionado no tiene un formato válido.
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       403:
 *         $ref: '#/components/responses/Forbidden403'
 *       404:
 *         description: El workspace no existe, el canal no existe, o el canal no pertenece al workspace indicado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               workspace_inexistente:
 *                 summary: El workspace no existe
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: Espacio de trabajo no encontrado.
 *               canal_inexistente:
 *                 summary: El canal no existe
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: Canal no encontrado.
 *               canal_ajeno:
 *                 summary: El canal pertenece a otro workspace
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: Canal no encontrado en el espacio de trabajo seleccionado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
export default channelRouter;
