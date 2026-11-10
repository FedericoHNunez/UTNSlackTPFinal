import directMessageRepository from "../repositories/directMessage.repository.js";
import ServerError from "../helpers/error.helper.js";
import userRepository from "../repositories/user.repository.js";

class DirectMessageService {
    async createDirectMessage(id_sender, id_receiver, content) {
        if (!id_sender || !id_receiver || !content) {
            throw new ServerError("Los datos para enviar el mensaje directo están incompletos.", 400);
        }
        const exitUser = await userRepository.getById(id_receiver);
        if (!exitUser) {
            throw new ServerError("No se encontró al usuario destinatario.", 404);
        }
        const exitUser2 = await userRepository.getById(id_sender);
        if (!exitUser2) {
            throw new ServerError("Usuario no encontrado.", 404);
        }
        const directMessage = await directMessageRepository.create({ content, id_sender, id_receiver });
        return directMessage;
    }

    async getConversationsByUserId(id_user) {
        if (!id_user) {
            throw new ServerError("El identificador de usuario es obligatorio.", 400);
        }
        const userExist = await userRepository.getById(id_user);
        if (!userExist) {
            throw new ServerError("Usuario no encontrado.", 404);
        }
        const conversations = await directMessageRepository.getConversationsByUserId(id_user);
        return conversations;
    }

    async editMessageContent(messageId, newMessageContent) {
        if (!messageId || !newMessageContent) {
            throw new ServerError("El identificador del mensaje y el nuevo contenido son obligatorios.", 400);
        }
        const directMessage = await directMessageRepository.updateById(messageId, { content: newMessageContent });
        if (!directMessage) {
            throw new ServerError("Mensaje no encontrado.", 404);
        }
        return directMessage;
    }

    async getMessagesByReceiverId(sender_id, receiver_id) {
        if (!sender_id || !receiver_id) {
            throw new ServerError("Los identificadores de los usuarios son obligatorios.", 400);
        }
        const messages = await directMessageRepository.getMessagesByReceiverId(sender_id, receiver_id);
        return messages;
    }


}




const directMessageService = new DirectMessageService();
export default directMessageService;
