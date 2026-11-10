import directMessageService from "../services/directMessage.service.js";
import successResponse from "../helpers/response.helper.js";

class DirectMessageController {
    async createDirectMessage(req, res) {
        const id_sender = req.user.id;
        const id_receiver = req.params.user_id;
        const { message } = req.body;
        const newDirectMessage = await directMessageService.createDirectMessage(id_sender, id_receiver, message);
        return successResponse(res, "Mensaje directo enviado correctamente.", { newDirectMessage });
    }

    async getConversationsByUserId(req, res) {
        const { id } = req.user;
        const foundMessages = await directMessageService.getConversationsByUserId(id);
        return successResponse(res, "Conversaciones obtenidas correctamente.", { foundMessages });
    }
    async editMessageContent(req, res) {
        const { message_id, content } = req.body;
        const editedMessage = await directMessageService.editMessageContent(message_id, content);
        return successResponse(res, "Mensaje editado correctamente.", { editedMessage });
    }

    async getMessagesByReceiverId(req, res) {
        const receiver_id = req.params.user_id
        const sender_id = req.user.id
        const messages = await directMessageService.getMessagesByReceiverId(sender_id, receiver_id)
        return successResponse(res, "Mensajes obtenidos correctamente.", { messages });
    }
}
const directMessageController = new DirectMessageController();
export default directMessageController;