import express from "express";
import directMessageController from "../controllers/directMessage.controller.js";

const directMessageRouter = express.Router({ mergeParams: true });

directMessageRouter.get('/', directMessageController.getConversationsByUserId);
/**
 * @openapi
 * /directMessages:
 *   get:
 *     tags: [Direct Messages]
 *     summary: Listar las conversaciones del usuario autenticado
 *     description: >
 *       Devuelve la lista de conversaciones del usuario autenticado, una por contacto,
 *       con el último mensaje intercambiado y su fecha.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Conversaciones obtenidas correctamente.
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
 *                         foundMessages:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Conversation'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Conversaciones obtenidas correctamente.
 *               data:
 *                 foundMessages:
 *                   - contact:
 *                       _id: 65f1a2b3c4d5e6f7a8b9c0d6
 *                       userName: maria_gomez
 *                       email: maria@example.com
 *                     lastMessage: ¿Nos juntamos mañana para el TP?
 *                     lastMessageAt: 2026-11-17T11:45:00.000Z
 *       400:
 *         description: Falta el identificador del usuario (error interno con el token).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 400
 *               code: null
 *               message: El identificador de usuario es obligatorio.
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
directMessageRouter.post('/:user_id', directMessageController.createDirectMessage);
/**
 * @openapi
 * /directMessages/{user_id}:
 *   post:
 *     tags: [Direct Messages]
 *     summary: Enviar un mensaje directo
 *     description: >
 *       Crea un mensaje directo del usuario autenticado hacia el usuario indicado en la URL.
 *       El destinatario debe existir en la plataforma.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message]
 *             properties:
 *               message:
 *                 type: string
 *                 description: Contenido del mensaje directo.
 *                 example: ¿Nos juntamos mañana para el TP?
 *     responses:
 *       200:
 *         description: Mensaje directo enviado correctamente.
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
 *                         newDirectMessage:
 *                           $ref: '#/components/schemas/DirectMessage'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Mensaje directo enviado correctamente.
 *               data:
 *                 newDirectMessage:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d9
 *                   content: ¿Nos juntamos mañana para el TP?
 *                   id_sender: 65f1a2b3c4d5e6f7a8b9c0d3
 *                   id_receiver: 65f1a2b3c4d5e6f7a8b9c0d6
 *                   createdAt: 2026-11-17T12:00:00.000Z
 *                   updatedAt: 2026-11-17T12:00:00.000Z
 *       400:
 *         description: Mensaje faltante, ObjectId inválido, o JSON malformado.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorEnvelope'
 *                 - $ref: '#/components/schemas/InvalidJson'
 *             examples:
 *               mensaje_faltante:
 *                 summary: Falta el contenido del mensaje
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: Los datos para enviar el mensaje directo están incompletos.
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
 *       404:
 *         description: El usuario destinatario no existe (o el usuario del token no existe).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               destinatario_inexistente:
 *                 summary: No existe el usuario destinatario
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: No se encontró al usuario destinatario.
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
directMessageRouter.patch('/:user_id', directMessageController.editMessageContent);
/**
 * @openapi
 * /directMessages/{user_id}:
 *   patch:
 *     tags: [Direct Messages]
 *     summary: Editar el contenido de un mensaje directo
 *     description: >
 *       Actualiza el contenido de un mensaje directo identificado por su ID (enviado en el body).
 *       El `user_id` de la URL debe coincidir con el usuario del token.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [message_id, content]
 *             properties:
 *               message_id:
 *                 type: string
 *                 description: ID del mensaje directo a editar (ObjectId de MongoDB).
 *                 example: 65f1a2b3c4d5e6f7a8b9c0d9
 *               content:
 *                 type: string
 *                 description: Nuevo contenido del mensaje.
 *                 example: Mejor nos juntamos el jueves.
 *     responses:
 *       200:
 *         description: Mensaje editado correctamente.
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
 *                         editedMessage:
 *                           $ref: '#/components/schemas/DirectMessage'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Mensaje editado correctamente.
 *               data:
 *                 editedMessage:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d9
 *                   content: Mejor nos juntamos el jueves.
 *                   id_sender: 65f1a2b3c4d5e6f7a8b9c0d3
 *                   id_receiver: 65f1a2b3c4d5e6f7a8b9c0d6
 *                   createdAt: 2026-11-17T12:00:00.000Z
 *                   updatedAt: 2026-11-17T12:05:00.000Z
 *       400:
 *         description: message_id o content faltantes, ObjectId inválido, o JSON malformado.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorEnvelope'
 *                 - $ref: '#/components/schemas/InvalidJson'
 *             examples:
 *               campos_faltantes:
 *                 summary: Falta el identificador o el contenido
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El identificador del mensaje y el nuevo contenido son obligatorios.
 *               id_invalido:
 *                 summary: ObjectId inválido en la URL o en message_id
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado no tiene un formato válido.
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       404:
 *         description: El mensaje directo no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 404
 *               code: null
 *               message: Mensaje no encontrado.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
directMessageRouter.get('/:user_id', directMessageController.getMessagesByReceiverId);
/**
 * @openapi
 * /directMessages/{user_id}:
 *   get:
 *     tags: [Direct Messages]
 *     summary: Obtener el historial de mensajes con un contacto
 *     description: >
 *       Devuelve los mensajes directos intercambiados entre el usuario autenticado y el contacto
 *       indicado, ordenados del más antiguo al más reciente. Emisor y receptor vienen poblados
 *       como `{_id, userName}`.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/UserId'
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
 *                         messages:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/DirectMessage'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Mensajes obtenidos correctamente.
 *               data:
 *                 messages:
 *                   - _id: 65f1a2b3c4d5e6f7a8b9c0d9
 *                     content: ¿Nos juntamos mañana para el TP?
 *                     id_sender:
 *                       _id: 65f1a2b3c4d5e6f7a8b9c0d3
 *                       userName: juan_perez
 *                     id_receiver:
 *                       _id: 65f1a2b3c4d5e6f7a8b9c0d6
 *                       userName: maria_gomez
 *                     createdAt: 2026-11-17T12:00:00.000Z
 *                     updatedAt: 2026-11-17T12:00:00.000Z
 *       400:
 *         description: Falta alguno de los identificadores de usuario, o ObjectId inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               ids_faltantes:
 *                 summary: Falta un identificador de usuario
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: Los identificadores de los usuarios son obligatorios.
 *               id_invalido:
 *                 summary: ObjectId inválido en la URL
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: INVALID_ID
 *                   message: El identificador proporcionado no tiene un formato válido.
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
export default directMessageRouter;
