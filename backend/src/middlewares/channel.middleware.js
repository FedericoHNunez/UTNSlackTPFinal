import channelRepository from "../repositories/channel.repository.js";
import ServerError from "../helpers/error.helper.js";

async function channelMiddleware(req, res, next) {
    const { channel_id } = req.params;

    if (!channel_id) {
        throw new ServerError("El identificador del canal es obligatorio.", 400);
    }

    const channel_selected = await channelRepository.getById(channel_id);

    if (!channel_selected) {
        throw new ServerError("Canal no encontrado.", 404);
    }

    if (
        req.workspace_selected &&
        channel_selected.id_workspace.toString() !== req.workspace_selected._id.toString()
    ) {
        throw new ServerError("Canal no encontrado en el espacio de trabajo seleccionado.", 404);
    }

    req.channel_selected = channel_selected;
    next();
}

export default channelMiddleware;

