import tokenHelper from "../helpers/authHelpers/token.helper.js";
import ServerError from "../helpers/error.helper.js";
import memberRepository from "../repositories/member.repository.js";
import userRepository from "../repositories/user.repository.js";
import emailFormater from "../helpers/emailHelpers/emailFormater.helper.js";
import mailer_transporter from "../config/mailer.config.js";
import invitationRepository from "../repositories/invitation.repository.js";

class MemberService {
    async createMember(id_user, id_workspace, role = 'user') {
        const member = await memberRepository.create({ id_user, id_workspace, role });
        return member;
    }

    async getMembersByWorkspaceId(workspace_id) {

        return await memberRepository.getMenbersByWorkspaceId(workspace_id);

    }

    async getMemberById(member_id) {
        const member = await memberRepository.getById(member_id);
        if (!member) {
            throw new ServerError("Miembro no encontrado.", 404);
        }
        return member;
    }
    async deleteMemberById(member_selected, user_id) {
        if (member_selected.role === 'owner') {
            throw new ServerError("No se puede eliminar al propietario del espacio de trabajo.", 403);
        }
        if (member_selected.role === 'admin' && user_id !== member_selected.id_user) {
            throw new ServerError("No tienes permisos para eliminar a un administrador.", 403);
        }
        return await memberRepository.deleteById(member_selected._id);
    }

    async inviteMember(emailInvitedUser, workspace_id, role, senderUser, workspace_name) {

        const userInvetedFound = await userRepository.getByEmail(emailInvitedUser);
        if (!userInvetedFound) {
            throw new ServerError("No se encontró un usuario registrado con ese correo electrónico.", 404);
        }
        const userExistingInWorkspace = await memberRepository.getWorkspaceMembershipByUserId(userInvetedFound._id, workspace_id);

        if (userExistingInWorkspace) {
            throw new ServerError("El usuario ya forma parte de este espacio de trabajo.", 400);
        }

        if (role === 'owner') {
            throw new ServerError("No es posible asignar el rol de propietario en una invitación.", 400);
        }

        const invitation = await invitationRepository.create({ id_invitedUser: userInvetedFound._id, id_workspace: workspace_id, role: role });

        const token = await tokenHelper.createVerifyEmailToken(
            {
                invitation_id: invitation._id,
                role: role,
            }, "7d"
        );
        const invitationEmail = await emailFormater(
            userInvetedFound.userName,
            emailInvitedUser,
            token,
            `Unite a nuestro espacio de trabajo ${workspace_name}`,
            "invitationWorkspaceEmail",
            { workspace_name, role, workspace_id, senderUser }
        );

        await mailer_transporter.sendMail(invitationEmail);

        return invitation;
    }

    async acceptInvite(invitation_id, role) {


        const invitationFound = await invitationRepository.getById(invitation_id);
        if (!invitationFound || !invitationFound.active) {
            throw new ServerError("La invitación no es válida, ha expirado o ya fue utilizada.", 404);
        }
        const userInvetedFound = await userRepository.getById(invitationFound.id_invitedUser);
        if (!userInvetedFound) {
            throw new ServerError("No se pudo procesar la invitación.", 404);
        }
        const userExistingInWorkspace = await memberRepository.getWorkspaceMembershipByUserId(invitationFound.id_invitedUser, invitationFound.id_workspace);
        if (userExistingInWorkspace) {
            throw new ServerError("Ya eres miembro de este espacio de trabajo.", 400);
        }

        const newMember = await memberRepository.create(
            invitationFound.id_invitedUser,
            invitationFound.id_workspace,
            role,
            true
        );

        invitationFound.active = false;
        await invitationFound.save();

        return newMember;
    }
}

const memberService = new MemberService();
export default memberService;