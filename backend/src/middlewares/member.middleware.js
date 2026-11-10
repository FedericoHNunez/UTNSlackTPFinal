import memberRepository from "../repositories/member.repository.js";
import ServerError from "../helpers/error.helper.js";

const memberMiddleware = (roles) => {
    return async (req, res, next) => {
        const member_id = req.params.member_id;
        const member_selected = await memberRepository.getById(member_id);
        if (!member_selected) {
            throw new ServerError("No se encontró la membresía en este espacio de trabajo.", 404);
        }
        req.member_selected = member_selected;
        next();
    }
}

export default memberMiddleware;
