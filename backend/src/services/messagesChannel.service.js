import channelMessageRepository from "../repositories/channelMessage.repository.js";
import userRepository from "../repositories/user.repository.js";
import ServerError from "../helpers/error.helper.js";

class MessagesChannelService {

    async createMessage(content, channel_id, user_id) {
        if (!content || !user_id) {
            throw new ServerError(
                "Missing required fields: content and user_id are required.",
                400
            );
        }

        const userFound = await userRepository.getById(user_id);
        if (!userFound) {
            throw new ServerError("User not found.", 404);
        }

        const newMessage = await channelMessageRepository.create(content, channel_id, user_id);
        return newMessage;
    }

    async updateMessageById(message_id, content, user_id) {
        if (!message_id || !content) {
            throw new ServerError(
                "Missing required fields: message_id and content are required.",
                400
            );
        }

        const messageFound = await channelMessageRepository.getById(message_id);
        if (!messageFound) {
            throw new ServerError("Message not found.", 404);
        }

        if (user_id && messageFound.id_user.toString() !== user_id.toString()) {
            throw new ServerError("You do not have permission to edit this message.", 403);
        }

        const updatedMessage = await channelMessageRepository.updateById(message_id, { content });
        return updatedMessage;
    }

    async deleteMessageById(message_id, user_id) {
        if (!message_id) {
            throw new ServerError("Missing required fields: message_id is required.", 400);
        }

        const messageFound = await channelMessageRepository.getById(message_id);
        if (!messageFound) {
            throw new ServerError("Message not found.", 404);
        }

        if (user_id && messageFound.id_user.toString() !== user_id.toString()) {
            throw new ServerError("You do not have permission to delete this message.", 403);
        }

        const deletedMessage = await channelMessageRepository.deleteById(message_id);
        return deletedMessage;
    }
}

const messagesChannelService = new MessagesChannelService();
export default messagesChannelService;
