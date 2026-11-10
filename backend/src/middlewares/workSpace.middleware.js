import memberRepository from "../repositories/member.repository.js"
import workspaceRepository from "../repositories/workspace.repository.js"
import ServerError from "../helpers/error.helper.js"

function workSpaceMiddleware(valid_roles = []) {

    return async function (req, res, next) {
        const { workspace_id } = req.params;
        const workspace_selected = await workspaceRepository.getById(workspace_id);

        if (!workspace_selected) {
            throw new ServerError(
                'Espacio de trabajo no encontrado.',
                404
            );
        }

        if (!req.user) {
            throw new ServerError(
                'No autorizado. Debes iniciar sesión para continuar.',
                401
            );
        }

        const membership = await memberRepository.getWorkspaceMembershipByUserId(req.user.id, workspace_selected._id);

        if (!membership) {
            throw new ServerError(
                'No tienes permisos para acceder a este espacio de trabajo.',
                403
            );
        }

        if (valid_roles.length > 0 && !valid_roles.includes(membership.role)) {
            throw new ServerError(
                'No tienes permisos suficientes para realizar esta operación.',
                403
            );
        }

        req.workspace_selected = workspace_selected;
        req.membership = membership;
        next();
    };
}

export default workSpaceMiddleware