import BaseRepository from './base.repository.js';
import channelMessagesModel from '../models/channelMessage.model.js';

class ChannelMessageRepository extends BaseRepository {
    constructor() {
        super(channelMessagesModel);
    }


    async getMessagesByChannelId(channelId) {
        return await this.model
            .find({ id_channel: channelId })
            .populate('id_user', 'userName')
            .sort({ createdAt: 1 });
    }

    async deleteAllMessagesByChannelId(channel_id) {
        return await this.model
            .deleteMany({ id_channel: channel_id });
    }

    async softDeleteById(message_id) {
        return await this.model.findByIdAndUpdate(
            message_id,
            {
                active: false,
                content: 'Este mensaje fue eliminado.'
            },
            { returnDocument: 'after' }
        );
    }

    async searchMessagesByChannelIds(channelIds, regex, limit = 15) {
        if (!Array.isArray(channelIds) || channelIds.length === 0) {
            return [];
        }
        return await this.model
            .find({
                id_channel: { $in: channelIds },
                active: { $ne: false },
                content: { $regex: regex }
            })
            .populate('id_user', 'userName')
            .populate('id_channel', 'name')
            .sort({ createdAt: -1 })
            .limit(limit);
    }
}

const channelMessageRepository = new ChannelMessageRepository();
export default channelMessageRepository;
