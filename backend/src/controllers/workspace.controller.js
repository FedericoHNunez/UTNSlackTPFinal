import workspaceService from "../services/workspace.service.js";
import memberService from "../services/member.service.js";
import successResponse from "../helpers/response.helper.js";

class WorkspaceController {

    async getWorkspacesByUserId(req, res) {
        const user_id = req.user.id;
        const workspaceList = await workspaceService.getWorkspacesByUserId(user_id);
        return successResponse(res, "Espacios de trabajo obtenidos correctamente.", { workspaces: workspaceList });
    }

    async createWorkspace(req, res) {
        const { name, description } = req.body;
        const user_id = req.user.id;
        const workspace = await workspaceService.createWorkspace(name, description);
        const member = await memberService.createMember(user_id, workspace._id, 'owner');
        return successResponse(res, "Espacio de trabajo creado correctamente.", { workspace, member }, 201);
    }

    async deleteWorkspaceById(req, res) {
        const workspace_id = req.workspace_selected._id;
        const result = await workspaceService.deleteWorkspaceById(workspace_id);
        return successResponse(res, "Espacio de trabajo eliminado correctamente.", { result });
    }
    async getChannelsByWorkspaceId(req, res) {
        const workspace_id = req.workspace_selected._id;
        const channels = await workspaceService.getChannelsByWorkspaceId(workspace_id);
        return successResponse(res, "Canales obtenidos correctamente.", { channels });
    }
    async updateWorkspaceById(req, res) {
        const workspace_id = req.workspace_selected._id;
        const { name, description } = req.body;
        const workspace = await workspaceService.updateWorkspaceById(workspace_id, name, description);
        return successResponse(res, "Espacio de trabajo actualizado correctamente.", { workspace });
    }

    async inviteNewUser(req, res) {
        const { email } = req.body;
        const userName = req.user.userName;
        const userEmail = req.user.email;
        await workspaceService.inviteNewUser(email, userName, userEmail);
        return successResponse(res, "Invitación enviada correctamente.");
    }


}
const workspaceController = new WorkspaceController();
export default workspaceController;