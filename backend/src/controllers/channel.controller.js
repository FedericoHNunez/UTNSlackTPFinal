import channelService from "../services/channel.service.js";
import successResponse from "../helpers/response.helper.js";

class ChannelControler {

    async createChannel(req, res) {
        const workspace_id = req.workspace_selected._id;
        const { name, description } = req.body;
        const channel = await channelService.createChannel(name, description, workspace_id);
        return successResponse(res, "Canal creado correctamente.", { channel }, 201);
    }

    async getMessagesByChannelId(req, res) {
        const channel_id = req.channel_selected._id;
        const messagesChannel = await channelService.getMessagesByChannelId(channel_id);
        return successResponse(res, "Mensajes obtenidos correctamente.", { messagesChannel }, 200);
    }
}

const channelController = new ChannelControler();
export default channelController;
