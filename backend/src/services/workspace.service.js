import workspaceRepository from "../repositories/workspace.repository.js";
import ServerError from "../helpers/error.helper.js";
import userRepository from "../repositories/user.repository.js";
import memberRepository from "../repositories/member.repository.js";
import channelRepository from "../repositories/channel.repository.js";

class WorkspaceService {
    async getWorkspaces(filter = null) {
        if (!filter) {
            return await workspaceRepository.getAll();
        }
        return await workspaceRepository.getByOneSearchTerm(filter);
    }

    async getWorkspacesByUserId(user_id) {
        if (!user_id) {
            throw new ServerError(
                "Missing required fields: user_id is required.",
                400
            );
        }
        const userExist = await userRepository.getById(user_id);
        if (!userExist) {
            throw new ServerError(
                "User not found.",
                404
            );
        }
        const members = await memberRepository.getWorkspacesByUserId(user_id);
        const memberFormated = members.map(member => {
            return {
                member_id: member._id,
                workspace_id: member.id_workspace._id,
                workspace_name: member.id_workspace.name,
                workspace_description: member.id_workspace.description,
                workspace_role: member.role,
                workspace_creation_date: member.createdAt
            }
        })
        return memberFormated;
    }

    async createWorkspace(name, description) {
        if (!name || !description) {
            throw new ServerError(
                "Missing required fields: name and description are required.",
                400
            );
        }
        return await workspaceRepository.create(name, description);
    }

    async deleteWorkspaceById(workspace_id) {
        const channelsInWorkspaces = await channelRepository.getChannelsByWorkspaceId(workspace_id);
        let deletedMessages = [];
        for (const channel of channelsInWorkspaces) {
            deletedMessages = await channelMessageRepository.deleteAllMessagesByChannelId(channel._id);
        }
        const deletedMembers = await memberRepository.deleteByWorkspaceId(workspace_id);
        const deletedWorkspace = await workspaceRepository.deleteById(workspace_id);

        return {
            deletedWorkspace: deletedWorkspace,
            deletedMembers: deletedMembers,
            deletedMessages: deletedMessages,
        }
    }

    async getChannelsByWorkspaceId(workspace_id) {
        if (!workspace_id) {
            throw new ServerError(
                "Missing required fields: workspace_id is required.",
                400
            );
        }
        const workspaceExist = await workspaceRepository.getById(workspace_id);
        if (!workspaceExist) {
            throw new ServerError(
                "Workspace not found.",
                404
            );
        }
        const channelsFound= await channelRepository.getChannelsByWorkspaceId(workspace_id);
        const channelsFormated = channelsFound.map(channel => {
            return {
                channel_id: channel._id,
                channel_name: channel.name,
                channel_description: channel.description,
                channel_creation_date: channel.createdAt,
                channel_updated_date: channel.updatedAt,
                workspace_id: channel.id_workspace,
            }
        })
        return channelsFormated
    }

    async updateWorkspaceById(workspace_id, name, description) {
        if (!workspace_id) {
            throw new ServerError(
                "Missing required fields: workspace_id is required.",
                400
            );
        }
        const workspaceExist = await workspaceRepository.getById(workspace_id);
        if (!workspaceExist) {
            throw new ServerError(
                "Workspace not found.",
                404
            );
        }
        return await workspaceRepository.updateWorkspaceById(workspace_id, name, description);
    }
}

const workspaceService = new WorkspaceService();
export default workspaceService;
