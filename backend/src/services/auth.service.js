import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";
import { hashPassword, compareHash } from "../helpers/authHelpers/bcrypt.helper.js";
import { isValidEmail } from "../helpers/emailHelpers/emailvalidation.helper.js";
import tokenHelper from "../helpers/authHelpers/token.helper.js";
import emailFormater from "../helpers/emailHelpers/emailFormater.helper.js";
import mailer_transporter from "../config/mailer.config.js";
import ENVIRONMENT from "../config/environment.config.js"

class AuthService {
    async registerUser(userName, email, password) {
        if (!userName || !email || !password) {
            throw new ServerError(
                "Todos los campos son obligatorios.",
                400
            );
        }

        if (!isValidEmail(email)) {
            throw new ServerError("El formato del correo electrónico no es válido.", 400);
        }

        const userEmailExist = await userRepository.getByEmail(email);
        if (userEmailExist) {
            throw new ServerError("No fue posible completar el registro con los datos ingresados.", 409, "ALREADY_EXISTS");
        }
        const userNameExist = await userRepository.getByUserName(userName);
        if (userNameExist) {
            throw new ServerError("No fue posible completar el registro con los datos ingresados.", 409, "ALREADY_EXISTS");
        }

        const hashedPassword = await hashPassword(password);
        const user = await userRepository.create({ userName, email, password: hashedPassword });
        const verify_email_token = tokenHelper.createVerifyEmailToken(
            {
                email: user.email
            },
            "1d"
        );
        const verifyEmail = await emailFormater(
            user.userName,
            user.email,
            verify_email_token,
            "Confirmación de Registro en Slak",
            "verifyEmail",

        );
        await mailer_transporter.sendMail(verifyEmail);
        return user;
    }

    async loginUser(email, password) {
        if (!email || !password) {
            throw new ServerError(
                "Debes ingresar tus credenciales para iniciar sesión.",
                400
            );
        }

        if (!isValidEmail(email)) {
            throw new ServerError("Credenciales inválidas. Verifica tus datos e inténtalo nuevamente.", 401, "INVALID_CREDENTIALS");
        }

        const user = await userRepository.getByEmail(email);

        if (!user) {
            throw new ServerError("Credenciales inválidas. Verifica tus datos e inténtalo nuevamente.", 401, "INVALID_CREDENTIALS");
        }
        const userPasswordMatch = await compareHash(password, user.password);
        if (!userPasswordMatch || !user.active) {
            throw new ServerError("Credenciales inválidas. Verifica tus datos e inténtalo nuevamente.", 401, "INVALID_CREDENTIALS");
        }
        if (!user.emailVerified) {
            throw new ServerError(
                "La cuenta aún no ha sido verificada. Revisa tu correo electrónico para activarla.",
                403,
                "EMAIL_NOT_VERIFIED"
            );
        }
        const auth_token = tokenHelper.createLoginToken(
            {
                _id: user._id,
                email: user.email,
                userName: user.userName
            }
        );

        return auth_token;
    }

    async verifyEmail(email) {
        const userFound = await userRepository.getByEmail(email);

        if (!userFound || !userFound.active) {
            throw new ServerError("El enlace de verificación no es válido o ha expirado.", 400);
        }
        if (userFound.emailVerified) {
            throw new ServerError("La cuenta ya se encuentra verificada.", 400, "ALREADY_VERIFIED");
        }
        const userVerified = await userRepository.updateById(
            userFound._id,
            { emailVerified: true }
        );
        return userVerified.userName;
    }

    async resendVerificationEmail(email) {
        if (!email || !isValidEmail(email)) {
            throw new ServerError("Debes ingresar un correo electrónico con formato válido.", 400, "INVALID_EMAIL");
        }
        const user = await userRepository.getByEmail(email);
        if (!user || !user.active) {
            return;
        }
        if (user.emailVerified) {
            throw new ServerError("La cuenta ya se encuentra verificada.", 400, "ALREADY_VERIFIED");
        }
        const verify_email_token = tokenHelper.createVerifyEmailToken(
            { email: user.email },
            "7d"
        );
        const verifyEmail = await emailFormater(
            user.userName,
            user.email,
            verify_email_token,
            "Confirmación de Registro en Slak",
            "verifyEmail"
        );
        await mailer_transporter.sendMail(verifyEmail);
        return;
    }

    async resetPassword(email) {

        if (!email || !isValidEmail(email)) {
            throw new ServerError("Debes ingresar un correo electrónico con formato válido.", 400);
        }
        const user = await userRepository.getByEmail(email);
        if (!user || !user.active) return;

        const resetPasswordToken = tokenHelper.createVerifyEmailToken(
            {
                email: user.email,
                userName: user.userName
            },
            "1h"
        );
        const resetPasswordEmail = await emailFormater(
            user.userName,
            user.email,
            resetPasswordToken,
            "Reinicio de Contraseña en Slak",
            "resetpasswordEmail",

        );
        await mailer_transporter.sendMail(resetPasswordEmail);
        return;
    }


    async changePassword(email, userName, newPassword, confirmNewPassword) {
        if (!email || !userName) {
            throw new ServerError("El enlace de recuperación no es válido o ha expirado.", 401, "INVALID_TOKEN");
        }
        if (!newPassword || !confirmNewPassword) {
            throw new ServerError("Debes completar todos los campos de contraseña.", 400);
        }
        if (newPassword !== confirmNewPassword) {
            throw new ServerError("Las contraseñas ingresadas no coinciden.", 400);
        }
        const userFound = await userRepository.getByEmail(email);
        if (!userFound || !userFound.active) {
            throw new ServerError("No se pudo procesar el cambio de contraseña. El enlace no es válido o ha expirado.", 400);
        }
        const hashedPassword = await hashPassword(newPassword);
        const userUpdated = await userRepository.updateById(
            userFound._id,
            { password: hashedPassword }
        );
        return userUpdated.userName;
    }

}

const authService = new AuthService();
export default authService;
