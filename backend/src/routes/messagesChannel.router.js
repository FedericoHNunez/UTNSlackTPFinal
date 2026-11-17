import express from 'express';
import messagesChannelController from '../controllers/messagesChannel.controller.js';

const MessagesChannelRouter = express.Router({ mergeParams: true });

MessagesChannelRouter.post('/', messagesChannelController.createMessage);
/**
 * @openapi
 * /workspaces/{workspace_id}/channels/{channel_id}/messages:
 *   post:
 *     tags: [Channel Messages]
 *     summary: Enviar un mensaje a un canal
 *     description: >
 *       Crea un nuevo mensaje en el canal indicado, con el autor tomado del token JWT.
 *       El canal debe existir y pertenecer al workspace indicado.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *       - $ref: '#/components/parameters/ChannelId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 description: Contenido del mensaje.
 *                 example: Hola equipo, ¿cómo están?
 *     responses:
 *       201:
 *         description: Mensaje enviado correctamente.
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
 *                         message:
 *                           $ref: '#/components/schemas/ChannelMessage'
 *             example:
 *               ok: true
 *               status: 201
 *               message: Mensaje enviado correctamente.
 *               data:
 *                 message:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d5
 *                   content: Hola equipo, ¿cómo están?
 *                   id_channel: 65f1a2b3c4d5e6f7a8b9c0d4
 *                   id_user:
 *                     _id: 65f1a2b3c4d5e6f7a8b9c0d3
 *                     userName: juan_perez
 *                   createdAt: 2026-11-17T12:00:00.000Z
 *                   updatedAt: 2026-11-17T12:00:00.000Z
 *       400:
 *         description: Contenido faltante o vacío, ObjectId inválido, o JSON malformado.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorEnvelope'
 *                 - $ref: '#/components/schemas/InvalidJson'
 *             examples:
 *               contenido_faltante:
 *                 summary: Falta el contenido del mensaje
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El contenido del mensaje es obligatorio.
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
 *       404:
 *         description: El canal no existe, no pertenece al workspace, o el usuario del token no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
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
 *               usuario_inexistente:
 *                 summary: El usuario del token no existe
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: Usuario no encontrado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
MessagesChannelRouter.put('/:message_id', messagesChannelController.updateMessageById);
/**
 * @openapi
 * /workspaces/{workspace_id}/channels/{channel_id}/messages/{message_id}:
 *   put:
 *     tags: [Channel Messages]
 *     summary: Editar un mensaje de canal
 *     description: >
 *       Actualiza el contenido de un mensaje. Solo el autor del mensaje puede editarlo.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *       - $ref: '#/components/parameters/ChannelId'
 *       - $ref: '#/components/parameters/MessageId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [content]
 *             properties:
 *               content:
 *                 type: string
 *                 description: Nuevo contenido del mensaje.
 *                 example: Corrijo, nos juntamos el jueves.
 *     responses:
 *       200:
 *         description: Mensaje actualizado correctamente.
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
 *                         message:
 *                           $ref: '#/components/schemas/ChannelMessage'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Mensaje actualizado correctamente.
 *               data:
 *                 message:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d5
 *                   content: Corrijo, nos juntamos el jueves.
 *                   id_channel: 65f1a2b3c4d5e6f7a8b9c0d4
 *                   id_user: 65f1a2b3c4d5e6f7a8b9c0d3
 *                   createdAt: 2026-11-17T12:00:00.000Z
 *                   updatedAt: 2026-11-17T12:05:00.000Z
 *       400:
 *         description: Content o message_id faltante, ObjectId inválido, o JSON malformado.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorEnvelope'
 *                 - $ref: '#/components/schemas/InvalidJson'
 *             examples:
 *               campos_faltantes:
 *                 summary: Falta el contenido o el identificador
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El identificador del mensaje y el contenido son obligatorios.
 *               id_invalido:
 *                 summary: ObjectId inválido en la URL
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado no tiene un formato válido.
 *       403:
 *         description: El usuario autenticado no es el autor del mensaje.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 403
 *               code: null
 *               message: No tienes permisos para editar este mensaje.
 *       404:
 *         description: El mensaje no existe, el canal no existe o no pertenece al workspace.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               mensaje_inexistente:
 *                 summary: El mensaje no existe
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: Mensaje no encontrado.
 *               canal_inexistente:
 *                 summary: El canal no existe o es de otro workspace
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: Canal no encontrado en el espacio de trabajo seleccionado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
MessagesChannelRouter.delete('/:message_id', messagesChannelController.deleteMessageById);
/**
 * @openapi
 * /workspaces/{workspace_id}/channels/{channel_id}/messages/{message_id}:
 *   delete:
 *     tags: [Channel Messages]
 *     summary: Eliminar un mensaje de canal
 *     description: >
 *       Elimina físicamente un mensaje del canal. Solo el autor del mensaje puede eliminarlo.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *       - $ref: '#/components/parameters/ChannelId'
 *       - $ref: '#/components/parameters/MessageId'
 *     responses:
 *       200:
 *         description: Mensaje eliminado correctamente.
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
 *                         message:
 *                           $ref: '#/components/schemas/ChannelMessage'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Mensaje eliminado correctamente.
 *               data:
 *                 message:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d5
 *                   content: Corrijo, nos juntamos el jueves.
 *                   id_channel: 65f1a2b3c4d5e6f7a8b9c0d4
 *                   id_user: 65f1a2b3c4d5e6f7a8b9c0d3
 *                   createdAt: 2026-11-17T12:00:00.000Z
 *                   updatedAt: 2026-11-17T12:05:00.000Z
 *       400:
 *         description: ObjectId inválido en la URL.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 400
 *               code: INVALID_ID
 *               message: El identificador proporcionado no tiene un formato válido.
 *       403:
 *         description: El usuario autenticado no es el autor del mensaje.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 403
 *               code: null
 *               message: No tienes permisos para eliminar este mensaje.
 *       404:
 *         description: El mensaje no existe, el canal no existe o no pertenece al workspace.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               mensaje_inexistente:
 *                 summary: El mensaje no existe
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: Mensaje no encontrado.
 *               canal_inexistente:
 *                 summary: El canal no existe o es de otro workspace
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: Canal no encontrado en el espacio de trabajo seleccionado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
export default MessagesChannelRouter;
