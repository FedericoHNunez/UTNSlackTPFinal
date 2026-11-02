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

    async createChannel(name, description, workspace_id) {
        if (!name || !description || !workspace_id) {
            throw new ServerError("Missing required fields: name, description and id_workspace are required.", 400);
        }
        const channel = await channelRepository.create(name, description, workspace_id);
        return channel;
    }

    async getMessagesByChannelId(channel_id) {
        const messagesChannelFound = await channelMessageRepository.getMessagesByChannelId(channel_id);
        return messagesChannelFound;
    }
}
const channelService = new ChannelService();
export default channelService;
