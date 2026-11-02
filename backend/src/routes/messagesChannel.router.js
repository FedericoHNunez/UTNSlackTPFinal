import express from 'express';
import messagesChannelController from '../controllers/messagesChannel.controller.js';

const MessagesChannelRouter = express.Router({ mergeParams: true });

MessagesChannelRouter.get('/', messagesChannelController.getMessagesByChannelId);
MessagesChannelRouter.post('/', messagesChannelController.createMessage);
MessagesChannelRouter.put('/:message_id', messagesChannelController.updateMessageById);
MessagesChannelRouter.delete('/:message_id', messagesChannelController.deleteMessageById);

export default MessagesChannelRouter;

