import userService from "../services/user.service.js";
import successResponse from "../helpers/response.helper.js";


class UserController {
    async getUserById(req, res) {
        const user_id = req.user.id;
        const user = await userService.getUserById(user_id);
        return successResponse(res, "Usuario obtenido correctamente.", { user });
    }

    async deleteUser(req, res) {
        const user_id = req.user.id;
        console.log(user_id);
        const user = await userService.deleteUser(user_id);
        return successResponse(res, "Usuario eliminado correctamente.", { user });
    }

}

const userController = new UserController();
export default userController;
