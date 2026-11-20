import channelRepository from "../repositories/channel.repository.js";
import ServerError from "../helpers/error.helper.js";
import channelMessageRepository from "../repositories/channelMessage.repository.js";

class ChannelService {

    async getChannels(filter = null) {
        if (!filter) {
            const channels = await channelRepository.getAll();
            return channels;
        }
        const channels = await channelRepository.getByOneSearchTerm(filter);
        return channels;
    }

    async createChannel(name, description, id_workspace) {
        if (!name || !description || !id_workspace) {
            throw new ServerError("El nombre, la descripción y el espacio de trabajo son obligatorios.", 400);
        }
        const channel = await channelRepository.create({ name, description, id_workspace });
        return channel;
    }

    async getMessagesByChannelId(channel_id) {
        return await channelMessageRepository.getMessagesByChannelId(channel_id);

    }

    async updateChannelById(channel_id, name, description) {
        if (!channel_id) {
            throw new ServerError("El identificador del canal es obligatorio.", 400);
        }
        return await channelRepository.updateById(channel_id, name, description);
    }

    async deleteChannelById(channel_id) {
        if (!channel_id) {
            throw new ServerError("El identificador del canal es obligatorio.", 400);
        }
        await channelMessageRepository.deleteAllMessagesByChannelId(channel_id);
        await channelRepository.deleteById(channel_id);
    }
}
const channelService = new ChannelService();
export default channelService;
