import invitationModel from "../models/invatation.model.js";
import BaseRepository from "./base.repository.js";

class InvitationRepository extends BaseRepository {
    constructor() {
        super(invitationModel)
    }


    async findActiveInvitation(id_invitedUser) {
        const invitation = await this.model.find({
            id_invitedUser,
            active: true
        });
        return invitation;
    }
}

const invitationRepository = new InvitationRepository()
export default invitationRepository