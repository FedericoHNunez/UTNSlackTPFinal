import express from 'express';
import authController from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/register', authController.registerUser);
/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registrar un nuevo usuario
 *     description: >
 *       Crea una cuenta nueva y envía un correo de verificación al email indicado.
 *       La cuenta queda con `emailVerified: false` hasta que se confirme vía
 *       `GET /auth/verify-email/{token_email_verify}`.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userName, email, password]
 *             properties:
 *               userName:
 *                 type: string
 *                 description: Nombre de usuario único.
 *                 example: juan_perez
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email único del usuario.
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Contraseña en texto plano (se almacena hasheada).
 *                 example: miPasswordSegura123
 *           examples:
 *             registro_valido:
 *               summary: Registro válido
 *               value:
 *                 userName: juan_perez
 *                 email: juan@example.com
 *                 password: miPasswordSegura123
 *     responses:
 *       201:
 *         description: "Usuario registrado correctamente (con `emailVerified: false`)."
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/UserFull'
 *             example:
 *               ok: true
 *               status: 201
 *               message: "Usuario registrado con éxito. Revisa tu correo electrónico para verificar tu cuenta."
 *               data:
 *                 _id: 65f1a2b3c4d5e6f7a8b9c0d1
 *                 userName: juan_perez
 *                 email: juan@example.com
 *                 password: $2b$10$Xk1...
 *                 active: true
 *                 emailVerified: false
 *       400:
 *         description: >
 *           Error en los datos enviados. Casos controlados: campos faltantes
 *           ("Todos los campos son obligatorios."), formato de email inválido,
 *           JSON malformado o error de validación de Mongoose.
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
 *                   message: Todos los campos son obligatorios.
 *               email_invalido:
 *                 summary: Formato de email inválido
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El formato del correo electrónico no es válido.
 *               json_malformado:
 *                 summary: JSON con sintaxis inválida
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   message: El formato JSON enviado es inválido. Verifica comillas y sintaxis.
 *               validacion_mongoose:
 *                 summary: No cumple el esquema de Mongoose
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: VALIDATION_ERROR
 *                   message: Los datos enviados no cumplen con el formato requerido.
 *                   errors: ["Path `userName` is required."]
 *       409:
 *         description: El usuario o el email ya se encuentra registrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               ambos_registrados:
 *                 summary: Usuario y email ya registrados
 *                 value:
 *                   ok: false
 *                   status: 409
 *                   code: ALREADY_REGISTERED
 *                   message: Usuario ya registrado.
 *               uno_registrado:
 *                 summary: Solo el usuario o solo el email ya registrados
 *                 value:
 *                   ok: false
 *                   status: 409
 *                   code: ALREADY_EXISTS
 *                   message: Usuario o email inválidos.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
authRouter.post('/login', authController.loginUser);
/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Iniciar sesión
 *     description: >
 *       Valida las credenciales del usuario (email y contraseña) y devuelve un token JWT
 *       para autenticar las demás peticiones. Requiere que el email esté verificado.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: juan@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: miPasswordSegura123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessEnvelope'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/LoginData'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Inicio de sesión exitoso.
 *               data:
 *                 auth_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   userName: juan_perez
 *                   email: juan@example.com
 *                   createdAt: 2026-01-15T10:30:00.000Z
 *       400:
 *         description: Faltan credenciales o el body es JSON malformado.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorEnvelope'
 *                 - $ref: '#/components/schemas/InvalidJson'
 *             examples:
 *               credenciales_faltantes:
 *                 summary: Falta email o password
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: Debes ingresar tus credenciales para iniciar sesión.
 *               json_malformado:
 *                 summary: JSON con sintaxis inválida
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   message: El formato JSON enviado es inválido. Verifica comillas y sintaxis.
 *       401:
 *         description: Credenciales inválidas (email inexistente, contraseña incorrecta o email con formato inválido).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 401
 *               code: INVALID_CREDENTIALS
 *               message: Credenciales inválidas. Verifica tus datos e inténtalo nuevamente.
 *       403:
 *         description: La cuenta existe pero el email aún no fue verificado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 403
 *               code: EMAIL_NOT_VERIFIED
 *               message: La cuenta aún no ha sido verificada. Revisa tu correo electrónico para activarla.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
authRouter.get('/verify-email/:token_email_verify', authController.verifyEmail);
/**
 * @openapi
 * /auth/verify-email/{token_email_verify}:
 *   get:
 *     tags: [Auth]
 *     summary: Verificar el email del usuario
 *     description: >
 *       Confirma la cuenta a partir del token JWT recibido en el email de registro.
 *       Marca `emailVerified: true` para habilitar el login.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token_email_verify
 *         required: true
 *         description: Token JWT de verificación recibido por email (válido por 1 día).
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Email verificado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Correo verificado correctamente. Ya puedes iniciar sesión.
 *               data: null
 *       400:
 *         description: El usuario no existe, la cuenta está inactiva o ya estaba verificada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               enlace_invalido:
 *                 summary: Usuario no encontrado o inactivo
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El enlace de verificación no es válido o ha expirado.
 *               ya_verificado:
 *                 summary: La cuenta ya está verificada
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: ALREADY_VERIFIED
 *                   message: La cuenta ya se encuentra verificada.
 *       401:
 *         description: El token de verificación expiró o es inválido.
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
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
authRouter.post('/resend-verification', authController.resendVerificationEmail);
/**
 * @openapi
 * /auth/resend-verification:
 *   post:
 *     tags: [Auth]
 *     summary: Reenviar el email de verificación
 *     description: >
 *       Envía un nuevo email de verificación a la cuenta indicada, si existe, está activa
 *       y aún no está verificada. La respuesta es genérica para no revelar si el email existe.
 *     security: []
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
 *                 example: juan@example.com
 *     responses:
 *       200:
 *         description: Procesado (el email se envía solo si la cuenta está pendiente de verificación).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Si el correo ingresado corresponde a una cuenta pendiente de verificación, recibirás un nuevo enlace.
 *               data: null
 *       400:
 *         description: Email faltante, con formato inválido, o la cuenta ya está verificada.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               email_invalido:
 *                 summary: Email faltante o con formato inválido
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: INVALID_EMAIL
 *                   message: Debes ingresar un correo electrónico con formato válido.
 *               ya_verificado:
 *                 summary: La cuenta ya está verificada
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: ALREADY_VERIFIED
 *                   message: La cuenta ya se encuentra verificada.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
authRouter.post('/reset-password', authController.resetPassword);
/**
 * @openapi
 * /auth/reset-password:
 *   post:
 *     tags: [Auth]
 *     summary: Solicitar recuperación de contraseña
 *     description: >
 *       Envía un email con un enlace/token para restablecer la contraseña (válido por 1 hora).
 *       La respuesta es genérica para no revelar si el email existe.
 *     security: []
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
 *                 example: juan@example.com
 *     responses:
 *       200:
 *         description: Procesado (el email se envía solo si la cuenta existe y está activa).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.
 *               data: null
 *       400:
 *         description: Email faltante o con formato inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 400
 *               code: null
 *               message: Debes ingresar un correo electrónico con formato válido.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
authRouter.patch('/reset-password', authController.changePassword);
/**
 * @openapi
 * /auth/reset-password:
 *   patch:
 *     tags: [Auth]
 *     summary: Restablecer la contraseña
 *     description: >
 *       Actualiza la contraseña usando el token JWT recibido en el email de recuperación.
 *       Las contraseñas nuevas y su confirmación deben coincidir.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, newPassword, confirmNewPassword]
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token JWT de recuperación recibido por email (válido por 1 hora).
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 example: nuevaPasswordSegura456
 *               confirmNewPassword:
 *                 type: string
 *                 format: password
 *                 example: nuevaPasswordSegura456
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Contraseña actualizada correctamente.
 *               data: null
 *       400:
 *         description: Campos faltantes, contraseñas que no coinciden, JSON malformado, o usuario inexistente/inactivo.
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - $ref: '#/components/schemas/ErrorEnvelope'
 *                 - $ref: '#/components/schemas/InvalidJson'
 *             examples:
 *               campos_faltantes:
 *                 summary: Faltan campos de contraseña
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: Debes completar todos los campos de contraseña.
 *               no_coinciden:
 *                 summary: Las contraseñas no coinciden
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: Las contraseñas ingresadas no coinciden.
 *               enlace_invalido:
 *                 summary: El usuario del token no existe o está inactivo
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: No se pudo procesar el cambio de contraseña. El enlace no es válido o ha expirado.
 *       401:
 *         description: Token inválido, expirado, o sin los datos esperados (email/userName).
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               token_sin_datos:
 *                 summary: El token no contiene email o userName
 *                 value:
 *                   ok: false
 *                   status: 401
 *                   code: INVALID_TOKEN
 *                   message: El enlace de recuperación no es válido o ha expirado.
 *               token_expirado:
 *                 summary: Token expirado
 *                 value:
 *                   ok: false
 *                   status: 401
 *                   code: TOKEN_EXPIRED
 *                   message: La sesión o el enlace ha expirado. Por favor, solicita uno nuevo o vuelve a iniciar sesión.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
authRouter.post('/reactivate-account', authController.requestReactivateAccount);
/**
 * @openapi
 * /auth/reactivate-account:
 *   post:
 *     tags: [Auth]
 *     summary: Solicitar reactivación de cuenta desactivada
 *     description: >
 *       Valida que el correo exista en la base de datos y corresponda a una cuenta inactiva (`active: false`),
 *       y envía un correo electrónico con un token JWT para reactivar la cuenta (válido por 1 día).
 *     security: []
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
 *                 example: juan@example.com
 *     responses:
 *       200:
 *         description: Correo de reactivación enviado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Se ha enviado un correo electrónico con el enlace para reactivar tu cuenta.
 *               data: null
 *       400:
 *         description: Email con formato inválido o la cuenta ya se encuentra activa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               email_invalido:
 *                 summary: Email faltante o con formato inválido
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: INVALID_EMAIL
 *                   message: Debes ingresar un correo electrónico con formato válido.
 *               ya_activa:
 *                 summary: La cuenta ya está activa
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: ALREADY_ACTIVE
 *                   message: La cuenta ya se encuentra activa.
 *       404:
 *         description: No existe un usuario registrado con ese correo electrónico.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             example:
 *               ok: false
 *               status: 404
 *               code: USER_NOT_FOUND
 *               message: No existe ningún usuario registrado con ese correo electrónico.
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
authRouter.get('/reactivate-account/:token_reactivate', authController.reactivateAccount);
/**
 * @openapi
 * /auth/reactivate-account/{token_reactivate}:
 *   get:
 *     tags: [Auth]
 *     summary: Confirmar reactivación de cuenta mediante token
 *     description: >
 *       Verifica el token JWT enviado por correo electrónico y vuelve a activar la cuenta
 *       del usuario (`active: true`) para permitirle iniciar sesión nuevamente.
 *     security: []
 *     parameters:
 *       - in: path
 *         name: token_reactivate
 *         required: true
 *         description: Token JWT de reactivación recibido por email (válido por 1 día).
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Cuenta reactivada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessEnvelope'
 *             example:
 *               ok: true
 *               status: 200
 *               message: Cuenta reactivada correctamente. Ya puedes iniciar sesión.
 *               data: null
 *       400:
 *         description: El usuario no existe o la cuenta ya estaba activa.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *             examples:
 *               enlace_invalido:
 *                 summary: Usuario no encontrado
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: null
 *                   message: El enlace de reactivación no es válido o ha expirado.
 *               ya_activa:
 *                 summary: La cuenta ya está activa
 *                 value:
 *                   ok: false
 *                   status: 400
 *                   code: ALREADY_ACTIVE
 *                   message: La cuenta ya se encuentra activa.
 *       401:
 *         description: El token de reactivación expiró o es inválido.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorEnvelope'
 *       500:
 *         $ref: '#/components/responses/ServerError500'
 */
export default authRouter;
