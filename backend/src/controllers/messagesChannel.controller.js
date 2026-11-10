import messagesChannelService from "../services/messagesChannel.service.js";
import successResponse from "../helpers/response.helper.js";

class MessagesChannelController {

    async createMessage(req, res) {
        const channel_id = req.channel_selected._id;
        const user_id = req.user.id;
        const { content } = req.body;

        const message = await messagesChannelService.createMessage(content, channel_id, user_id);
        return successResponse(res, "Mensaje enviado correctamente.", { message }, 201);
    }

    async updateMessageById(req, res) {
        const { message_id } = req.params;
        const user_id = req.user.id;
        const { content } = req.body;

        const message = await messagesChannelService.updateMessageById(message_id, content, user_id);
        return successResponse(res, "Mensaje actualizado correctamente.", { message }, 200);
    }

    async deleteMessageById(req, res) {
        const { message_id } = req.params;
        const user_id = req.user.id;

        const message = await messagesChannelService.deleteMessageById(message_id, user_id);
        return successResponse(res, "Mensaje eliminado correctamente.", { message }, 200);
    }
}

const messagesChannelController = new MessagesChannelController();
export default messagesChannelController;
