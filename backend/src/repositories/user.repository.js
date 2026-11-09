import BaseRepository from './base.repository.js';
import userModel from "../models/user.model.js";

class UserRepository extends BaseRepository {
    constructor() {
        super(userModel, 'userName');
    }


    async getGreaterDate(max_date, min_date) {
        const usersFound = await this.model.find(
            {
                createdAt: {
                    $gt: min_date, // Mayor que min_date
                    $lt: max_date  // Menor que max_date
                }
            }
        );
        return usersFound;
    }



    async getByEmail(email) {
        const userResult = await this.model.findOne({
            email: email
        });
        return userResult;
    }

    async getByUserName(userName) {
        const userResult = await this.model.findOne({
            userName: userName
        });
        return userResult;
    }
    async softDeleteById(userId) {
        await this.model.findByIdAndUpdate(
            userId,
            {
                active: false
            }
        );
    }

}

const userRepository = new UserRepository();
export default userRepository;