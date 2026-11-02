import express from 'express';
import channelController from '../controllers/channel.controller.js';
import MessagesChannelRouter from './messagesChannel.router.js';
import channelMiddleware from '../middlewares/channel.middleware.js';

const channelRouter = express.Router({ mergeParams: true });

channelRouter.use('/:channel_id/messages', channelMiddleware, MessagesChannelRouter);
channelRouter.use('/:channel_id/Channel_Messages', channelMiddleware, MessagesChannelRouter);

channelRouter.post('/', channelController.createChannel);
channelRouter.get('/:channel_id', channelMiddleware, channelController.getMessagesByChannelId);

export default channelRouter;
