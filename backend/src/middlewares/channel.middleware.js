import channelRepository from "../repositories/channel.repository.js";
import ServerError from "../helpers/error.helper.js";

async function channelMiddleware(req, res, next) {
    const { channel_id } = req.params;

    if (!channel_id) {
        throw new ServerError("Missing required fields: channel_id is required.", 400);
    }

    const channel_selected = await channelRepository.getById(channel_id);

    if (!channel_selected) {
        throw new ServerError("Channel not found.", 404);
    }

    if (
        req.workspace_selected &&
        channel_selected.id_workspace.toString() !== req.workspace_selected._id.toString()
    ) {
        throw new ServerError("This channel does not belong to the selected workspace.", 404);
    }

    req.channel_selected = channel_selected;
    next();
}

export default channelMiddleware;

