import workspaceRepository from "../repositories/workspace.repository.js";
import ServerError from "../helpers/error.helper.js";
import userRepository from "../repositories/user.repository.js";
import memberRepository from "../repositories/member.repository.js";
import channelRepository from "../repositories/channel.repository.js";
import { isValidEmail } from "../helpers/emailHelpers/emailvalidation.helper.js";
import emailFormater from "../helpers/emailHelpers/emailFormater.helper.js";
import mailer_transporter from "../config/mailer.config.js";
import channelMessageRepository from "../repositories/channelMessage.repository.js";
import directMessageRepository from "../repositories/directMessage.repository.js";

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
                "El identificador de usuario es obligatorio.",
                400
            );
        }
        const userExist = await userRepository.getById(user_id);
        if (!userExist) {
            throw new ServerError(
                "Usuario no encontrado.",
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
                workspace_creation_date: member.createdAt,
                workspace_members_count: member.membersCount
            }
        })
        return memberFormated;
    }

    async createWorkspace(name, description) {
        if (!name || !description) {
            throw new ServerError(
                "El nombre y la descripción del espacio de trabajo son obligatorios.",
                400
            );
        }
        const newWorkspace = await workspaceRepository.create({ name, description });
        await channelRepository.create({
            name: "informal",
            description: "Conversaciones en Social",
            id_workspace: newWorkspace._id
        })
        await channelRepository.create({
            name: "nuevo-canal",
            description: "Te damos la bienvenida a tu nuevo canal!",
            id_workspace: newWorkspace._id
        })
        await channelRepository.create({
            name: "todo-ejemplo",
            description: "Encuentra a todos en este canal",
            id_workspace: newWorkspace._id
        })
        
        return newWorkspace;
    }   

    async deleteWorkspaceById(workspace_id) {
        const channelsInWorkspaces = await channelRepository.getChannelsByWorkspaceId(workspace_id);
        for (const channel of channelsInWorkspaces) {
            await channelMessageRepository.deleteAllMessagesByChannelId(channel._id);
        }
        await memberRepository.deleteByWorkspaceId(workspace_id);
        await workspaceRepository.deleteById(workspace_id);

        return {
        }
    }

    async getChannelsByWorkspaceId(workspace_id) {
        if (!workspace_id) {
            throw new ServerError(
                "El identificador del espacio de trabajo es obligatorio.",
                400
            );
        }
        const workspaceExist = await workspaceRepository.getById(workspace_id);
        if (!workspaceExist) {
            throw new ServerError(
                "Espacio de trabajo no encontrado.",
                404
            );
        }
        const channelsFound = await channelRepository.getChannelsByWorkspaceId(workspace_id);
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
                "El identificador del espacio de trabajo es obligatorio.",
                400
            );
        }
        const workspaceExist = await workspaceRepository.getById(workspace_id);
        if (!workspaceExist) {
            throw new ServerError(
                "Espacio de trabajo no encontrado.",
                404
            );
        }
        return await workspaceRepository.updateById(workspace_id,
            {
                name,
                description
            }
        );
    }

    async inviteNewUser(email, userName, userEmail) {
        if (!email) {
            throw new ServerError(
                "El correo electrónico es obligatorio.",
                400
            );
        }
        if (!isValidEmail(email)) {
            throw new ServerError(
                "El formato del correo electrónico no es válido.",
                400
            );
        }
        const userExist = await userRepository.getByEmail(email);
        if (userExist) {
            throw new ServerError(
                "El usuario ya se encuentra registrado en la plataforma. Puedes invitarlo directamente al espacio de trabajo.",
                400
            );
        }

        const emailFormated = await emailFormater(
            null,
            email,
            null,
            "Invitacion a Unirte a Slack",
            "inviteNewUser",
            {
                userName,
                userEmail
            })
        await mailer_transporter.sendMail(emailFormated);
        return true;
    }

    async searchInWorkspace(workspace_id, user_id, rawQuery = "") {
        const trimmedQuery = String(rawQuery || "").trim().slice(0, 100);
        if (!trimmedQuery) {
            return {
                channels: [],
                members: [],
                channelMessages: [],
                directMessages: []
            };
        }

        const escapedQuery = trimmedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const searchRegex = new RegExp(escapedQuery, "i");

        const [channelsInWorkspace, membersInWorkspace] = await Promise.all([
            channelRepository.getChannelsByWorkspaceId(workspace_id),
            memberRepository.getMenbersByWorkspaceId(workspace_id)
        ]);

        const channelIds = channelsInWorkspace.map((ch) => ch._id);
        const validMembers = membersInWorkspace.filter((m) => Boolean(m.id_user?._id));
        const memberUserIds = validMembers.map((m) => m.id_user._id);

        const matchedChannels = channelsInWorkspace
            .filter(
                (ch) =>
                    searchRegex.test(ch.name || "") ||
                    searchRegex.test(ch.description || "")
            )
            .slice(0, 10)
            .map((ch) => ({
                channel_id: ch._id,
                channel_name: ch.name,
                channel_description: ch.description
            }));

        const matchedMembers = validMembers
            .filter(
                (m) =>
                    searchRegex.test(m.id_user.userName || "") ||
                    searchRegex.test(m.id_user.email || "")
            )
            .slice(0, 10)
            .map((m) => ({
                user_id: m.id_user._id,
                userName: m.id_user.userName,
                email: m.id_user.email,
                role: m.role
            }));

        const [foundChannelMsgs, foundDirectMsgs] = await Promise.all([
            channelMessageRepository.searchMessagesByChannelIds(
                channelIds,
                searchRegex,
                15
            ),
            directMessageRepository.searchDirectMessagesInWorkspace(
                user_id,
                memberUserIds,
                searchRegex,
                15
            )
        ]);

        const channelMessages = foundChannelMsgs.map((msg) => ({
            message_id: msg._id,
            content: msg.content,
            createdAt: msg.createdAt,
            channel_id: msg.id_channel?._id || msg.id_channel,
            channel_name: msg.id_channel?.name || "canal",
            author_id: msg.id_user?._id || msg.id_user,
            author_name: msg.id_user?.userName || "Usuario"
        }));

        const directMessages = foundDirectMsgs.map((dm) => {
            const isOwn = String(dm.id_sender?._id) === String(user_id);
            const contactObj = isOwn ? dm.id_receiver : dm.id_sender;
            return {
                message_id: dm._id,
                content: dm.content,
                createdAt: dm.createdAt,
                contact_id: contactObj?._id,
                contact_name: contactObj?.userName || "Usuario",
                author_id: dm.id_sender?._id,
                author_name: dm.id_sender?.userName || "Usuario",
                is_own: isOwn
            };
        });

        return {
            channels: matchedChannels,
            members: matchedMembers,
            channelMessages,
            directMessages
        };
    }
}

const workspaceService = new WorkspaceService();
export default workspaceService;
