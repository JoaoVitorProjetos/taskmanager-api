import { Request, Response } from "express";
import User from '../schemas/User';

class UserController{

    async create(req: Request, res: Response){
        const { name, email, password } = req.body;

        try {
            const user = await User.create({
                name,
                email,
                password,
            });

            return res.json(await User.find());
        }catch (e) {
            return res.status(500).send({
                error: "registation failed",
                message: e,
            });
        }
    }
}

export default new UserController();