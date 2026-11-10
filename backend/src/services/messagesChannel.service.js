import channelMessageRepository from "../repositories/channelMessage.repository.js";
import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";

class MessagesChannelService {

    async createMessage(content, id_channel, id_user) {
        if (!content || !id_user) {
            throw new ServerError(
                "El contenido del mensaje es obligatorio.",
                400
            );
        }

        const userFound = await userRepository.getById(id_user);
        if (!userFound) {
            throw new ServerError("Usuario no encontrado.", 404);
        }

        const newMessage = await channelMessageRepository.create({ content, id_channel, id_user });
        return newMessage;
    }

    async updateMessageById(message_id, content, user_id) {
        if (!message_id || !content) {
            throw new ServerError(
                "El identificador del mensaje y el contenido son obligatorios.",
                400
            );
        }

        const messageFound = await channelMessageRepository.getById(message_id);
        if (!messageFound) {
            throw new ServerError("Mensaje no encontrado.", 404);
        }

        if (user_id && messageFound.id_user.toString() !== user_id.toString()) {
            throw new ServerError("No tienes permisos para editar este mensaje.", 403);
        }

        const updatedMessage = await channelMessageRepository.updateById(message_id, { content });
        return updatedMessage;
    }

    async deleteMessageById(message_id, user_id) {
        if (!message_id) {
            throw new ServerError("El identificador del mensaje es obligatorio.", 400);
        }

        const messageFound = await channelMessageRepository.getById(message_id);
        if (!messageFound) {
            throw new ServerError("Mensaje no encontrado.", 404);
        }

        if (user_id && messageFound.id_user.toString() !== user_id.toString()) {
            throw new ServerError("No tienes permisos para eliminar este mensaje.", 403);
        }

        const deletedMessage = await channelMessageRepository.deleteById(message_id);
        return deletedMessage;
    }
}

const messagesChannelService = new MessagesChannelService();
export default messagesChannelService;
