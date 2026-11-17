import express from 'express';
import userController from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.get('/me', userController.getUserById);
/**
 * @openapi
 * /users/me:
 *   get:
 *     tags: [Users]
 *     summary: Obtener el perfil del usuario autenticado
 *     description: Devuelve los datos del usuario correspondiente al token JWT enviado.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente.
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
 *                         user:
 *                           $ref: '#/components/schemas/UserPublic'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Usuario obtenido correctamente.
 *               data:
 *                 user:
 *                   userName: juan_perez
 *                   email: juan@example.com
 *                   createdAt: 2026-01-15T10:30:00.000Z
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
userRouter.delete('/me', userController.deleteUser);
/**
 * @openapi
 * /users/me:
 *   delete:
 *     tags: [Users]
 *     summary: Eliminar la cuenta del usuario autenticado
 *     description: >
 *       Marca la cuenta del usuario autenticado como eliminada (baja lógica, `active: false`).
 *       Una vez eliminado, el usuario no podrá iniciar sesión.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: >
 *           Usuario eliminado correctamente (baja lógica, `active: false`).
 *           Nota: el repositorio no devuelve el documento actualizado, por lo que `data` llega vacío.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Usuario eliminado correctamente.
 *               data: {}
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
export default userRouter;
