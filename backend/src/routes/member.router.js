import express from 'express';
import memberController from '../controllers/member.controller.js';
import workSpaceMiddleware from '../middlewares/workSpace.middleware.js';
import memberMiddleware from '../middlewares/member.middleware.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const memberRouter = express.Router({ mergeParams: true });


memberRouter.get('/',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin', 'user']),
    memberController.getMembers);
/**
 * @openapi
 * /workspaces/{workspace_id}/members:
 *   get:
 *     tags: [Members]
 *     summary: Listar los miembros de un workspace
 *     description: >
 *       Devuelve todos los miembros del workspace, con los datos del usuario poblados
 *       como `{_id, userName, email}`. Cualquier miembro del workspace puede consultarlo.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *     responses:
 *       200:
 *         description: Miembros obtenidos correctamente.
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
 *                         members:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Member'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Miembros obtenidos correctamente.
 *               data:
 *                 members:
 *                   - _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                     id_user:
 *                       _id: 65f1a2b3c4d5e6f7a8b9c0d3
 *                       userName: juan_perez
 *                       email: juan@example.com
 *                     id_workspace: 65f1a2b3c4d5e6f7a8b9c0d2
 *                     role: owner
 *                     active: true
 *                     createdAt: 2026-01-15T10:30:00.000Z
 *                     updatedAt: 2026-01-15T10:30:00.000Z
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
memberRouter.delete('/:member_id',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin']),
    memberMiddleware,
    memberController.deleteMember);
/**
 * @openapi
 * /workspaces/{workspace_id}/members/{member_id}:
 *   delete:
 *     tags: [Members]
 *     summary: Eliminar a un miembro del workspace (owner o admin)
 *     description: >
 *       Elimina una membresía del workspace. Requiere rol `owner` o `admin`.
 *       Restricciones: no se puede eliminar al `owner`, y un `admin` no puede eliminar a otro `admin`
 *       que no sea él mismo.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *       - $ref: '#/components/parameters/MemberId'
 *     responses:
 *       200:
 *         description: Miembro eliminado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Miembro eliminado correctamente.
 *               data: {}
 *       400:
 *         $ref: '#/components/responses/InvalidId400'
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       403:
 *         description: Permiso denegado por el rol de la membresía objetivo o del usuario autenticado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               eliminar_owner:
 *                 summary: Se intenta eliminar al propietario
 *                 value:
 *                   ok: false
 *                   status: 403
 *                   code: null
 *                   message: No se puede eliminar al propietario del espacio de trabajo.
 *               eliminar_admin:
 *                 summary: Se intenta eliminar a un admin sin ser uno mismo
 *                 value:
 *                   ok: false
 *                   status: 403
 *                   code: null
 *                   message: No tienes permisos para eliminar a un administrador.
 *               rol_insuficiente:
 *                 summary: El usuario autenticado no es owner ni admin
 *                 value:
 *                   ok: false
 *                   status: 403
 *                   code: null
 *                   message: No tienes permisos suficientes para realizar esta operación.
 *       404:
 *         description: El workspace o la membresía no existen.
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
 *               membresia_inexistente:
 *                 summary: La membresía no existe
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: No se encontró la membresía en este espacio de trabajo.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
memberRouter.post('/invite',
    authMiddleware,
    workSpaceMiddleware(['owner', 'admin']),
    memberController.inviteMember);
/**
 * @openapi
 * /workspaces/{workspace_id}/members/invite:
 *   post:
 *     tags: [Members]
 *     summary: Invitar a un usuario registrado a un workspace (owner o admin)
 *     description: >
 *       Envía por email un enlace de invitación (token JWT válido por 7 días) al usuario registrado
 *       indicado. El rol asignado puede ser `admin` o `user` (nunca `owner`).
 *       Requiere rol `owner` o `admin` en el workspace.
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
 *             required: [email]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email del usuario registrado a invitar.
 *                 example: maria@example.com
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 default: user
 *                 description: Rol asignado al nuevo miembro (no se admite `owner`).
 *                 example: user
 *     responses:
 *       200:
 *         description: Invitación enviada correctamente.
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
 *                         invitation:
 *                           $ref: '#/components/schemas/Invitation'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Invitación enviada correctamente.
 *               data:
 *                 invitation:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d7
 *                   id_invitedUser: 65f1a2b3c4d5e6f7a8b9c0d6
 *                   id_workspace: 65f1a2b3c4d5e6f7a8b9c0d2
 *                   role: user
 *                   active: true
 *                   createdAt: 2026-11-17T12:00:00.000Z
 *                   updatedAt: 2026-11-17T12:00:00.000Z
 *       400:
 *         description: El usuario ya es miembro del workspace, o se intentó asignar el rol `owner`.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               ya_miembro:
 *                 summary: El usuario ya pertenece al workspace
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El usuario ya forma parte de este espacio de trabajo.
 *               rol_owner:
 *                 summary: Se intentó asignar el rol owner
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: No es posible asignar el rol de propietario en una invitación.
 *       401:
 *         $ref: '#/components/responses/Unauthorized401'
 *       403:
 *         $ref: '#/components/responses/Forbidden403'
 *       404:
 *         description: El workspace no existe, o no hay un usuario registrado con el email indicado.
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
 *               usuario_no_registrado:
 *                 summary: No existe un usuario con ese email
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: No se encontró un usuario registrado con ese correo electrónico.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
memberRouter.get('/accept-invite/:invitation_token',
    memberController.acceptInvite);
/**
 * @openapi
 * /workspaces/{workspace_id}/members/accept-invite/{invitation_token}:
 *   get:
 *     tags: [Members]
 *     summary: Aceptar una invitación a un workspace
 *     description: >
 *       Endpoint público (no requiere login) alcanzado desde el enlace del email de invitación.
 *       Valida el token JWT de invitación, crea la membresía y desactiva la invitación.
 *     security: []
 *     parameters:
 *       - $ref: '#/components/parameters/WorkspaceId'
 *       - in: path
 *         name: invitation_token
 *         required: true
 *         description: Token JWT de invitación recibido por email (válido por 7 días).
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Invitación aceptada correctamente.
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
 *                         member:
 *                           $ref: '#/components/schemas/Member'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Invitación aceptada correctamente.
 *               data:
 *                 member:
 *                   _id: 65f1a2b3c4d5e6f7a8b9c0d8
 *                   id_user: 65f1a2b3c4d5e6f7a8b9c0d6
 *                   id_workspace: 65f1a2b3c4d5e6f7a8b9c0d2
 *                   role: user
 *                   active: true
 *                   createdAt: 2026-11-17T12:00:00.000Z
 *                   updatedAt: 2026-11-17T12:00:00.000Z
 *       400:
 *         description: El usuario ya es miembro del workspace.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 400
 *               code: null
 *               message: Ya eres miembro de este espacio de trabajo.
 *       401:
 *         description: El token de invitación expiró o es inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               token_expirado:
 *                 summary: Token expirado
 *                 value:
 *                   ok: false
 *                   status: 401
 *                   code: TOKEN_EXPIRED
 *                   message: La sesión o el enlace ha expirado. Por favor, solicita uno nuevo o vuelve a iniciar sesión.
 *               token_invalido:
 *                 summary: Token inválido
 *                 value:
 *                   ok: false
 *                   status: 401
 *                   code: INVALID_TOKEN
 *                   message: No autorizado. Las credenciales o el enlace proporcionado no son válidos.
 *       404:
 *         description: La invitación no es válida, expiró, ya fue utilizada, o el usuario invitado no existe.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               invitacion_invalida:
 *                 summary: Invitación inexistente, expirada o ya usada
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: La invitación no es válida, ha expirado o ya fue utilizada.
 *               usuario_inexistente:
 *                 summary: El usuario invitado no existe
 *                 value:
 *                   ok: false
 *                   status: 404
 *                   code: null
 *                   message: No se pudo procesar la invitación.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
export default memberRouter;
