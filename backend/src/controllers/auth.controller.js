import authService from "../services/auth.service.js";
import successResponse from "../helpers/response.helper.js";
import jwt from "jsonwebtoken";
import ENVIRONMENT from "../config/environment.config.js";

class AuthController {
    async registerUser(req, res) {
        const { userName, email, password } = req.body;

        const user = await authService.registerUser(userName, email, password);

        return successResponse(res, "Usuario registrado con éxito. Revisa tu correo electrónico para verificar tu cuenta.", user, 201);
    }

    async loginUser(req, res) {
        const { email, password } = req.body;
        const auth_token = await authService.loginUser(email, password);
        return successResponse(
            res,
            "Inicio de sesión exitoso.",
            { auth_token }
        );
    }

    async verifyEmail(req, res) {
        const { token_email_verify } = req.params;
        const { email } = jwt.verify(token_email_verify, ENVIRONMENT.TOKEN_JWT_KEY);
        await authService.verifyEmail(email);
        return successResponse(res, "Correo verificado correctamente. Ya puedes iniciar sesión.");
    }

    async resendVerificationEmail(req, res) {
        const { email } = req.body;
        await authService.resendVerificationEmail(email);
        return successResponse(res, "Si el correo ingresado corresponde a una cuenta pendiente de verificación, recibirás un nuevo enlace.");
    }

    async resetPassword(req, res) {
        const { email } = req.body;
        await authService.resetPassword(email);
        return successResponse(res, "Si el correo existe en nuestro sistema, recibirás un enlace para restablecer tu contraseña.");
    }

    async changePassword(req, res) {
        const { newPassword, confirmNewPassword, token } = req.body;
        const { email, userName } = jwt.verify(token, ENVIRONMENT.TOKEN_JWT_KEY);
        await authService.changePassword(email, userName, newPassword, confirmNewPassword);
        return successResponse(res, "Contraseña actualizada correctamente.");
    }
}

const authController = new AuthController();
export default authController;
