import { Request, Response } from "express";
import User from '../schemas/User';
import Task from "../schemas/Task";

class UserController{

    async create(req: Request, res: Response){
        const { name, email, password } = req.body;

        const isEmailUnique = async () => {
            const array = await User.find({ email: email })

            if(array.length === 0){
                return true
            }else{
                return false
            }
        }

        try {
            isEmailUnique().then(async (result) => {
                if(result && email !== '' && password !== ''){
                    const user = await User.create({
                        name,
                        email,
                        password,
                    });

                    return res.json({
                        message: 'registration alowed'
                    });
                }else{
                    return res.json({
                        error: "registration failed",
                        message: "this email is already in use"
                    });
                }
            })
        }catch (e) {
            return res.status(500).send({
                error: "registration failed",
                message: e,
            });
        }
    }

    async find(req: Request, res: Response){
        const { email } = req.body

        try{
            res.json(await User.find({email: email}));
        }catch(e){
            return res.status(500).send({
                error: "find failed",
                message: e,
            });
        }
    }

    async login(req: Request, res: Response){
        const { email, password } = req.body;

        const userExists = async () => {
            const array = await User.find({ email: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        const authenticationPassword = async () => {
            const array = await User.find({ email: email, password: password })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        try{
            userExists().then(async (boolean) => {
                if(boolean){
                    authenticationPassword().then(async (boolean) => {
                        if(boolean){
                            res.json({
                                message: "login alowed"
                            })
                        }else{
                            res.json({
                                error: 'login failed',
                                message: 'incorrect password'
                            })
                        }
                    })
                }else{
                    res.json({
                        error: 'login failed',
                        message: "user not found"
                    })
                }
            })
        }catch(e){
            return res.status(500).send({
                error: "login failed",
                message: e,
            });
        }
    }

    async update(req: Request, res: Response){
        const { id,email, password, updateName, updateEmail, updatePass } = req.body;

        const userExists = async () => {
            const array = await User.find({ email: email })

            if(array.length != 0){
                return true
            }else{
                return false
            }
        } 
        const authenticationPassword = async () => {
            const array = await User.find({ email: email, password: password })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }
        const isEmailUnique = async () => {
            const array = await User.find({ _id: { $not: { $eq: `ObjectId('${id}')` }}, email: updateEmail })

            if(array.length === 0){
                return true
            }else{
                return false
            }
        }

        try{
            userExists().then(async (boolean) => {
                if(boolean){
                    authenticationPassword().then(async (boolean) => {
                        if(boolean){
                            isEmailUnique().then(async (boolean) => {
                                if(boolean){
                                    await User.updateOne({email: email}, {
                                        $set: {name: updateName, email: updateEmail, password: updatePass}
                                    })

                                    res.json(await User.find({email: updateEmail}))
                                }else{
                                    res.json({
                                        error: 'update failed',
                                        message: 'email already in use'
                                    })
                                }
                            })
                        }else{
                            res.json({
                                error: 'update failed',
                                message: 'incorrect password'
                            })
                        }
                    })
                }else{
                    res.json({
                        error: 'update failed',
                        message: "user not found"
                    })
                }
            })
        }catch(e){
            return res.status(500).send({
                error: "update failed",
                message: e,
            });
        }
    }

    async delete(req: Request, res: Response){
        const { email, password, deleteMessage } = req.body;

        const userExists = async () => {
            const array = await User.find({ email: email })

            if(array.length != 0){
                return true
            }else{
                return false
            }
        } 
        const authenticationPassword = async () => {
            const array = await User.find({ email: email, password: password })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }
        const authenticationDeleteMessage = async () => {
            if(deleteMessage === `delete ${email}`){
                return true
            }else{
                return false
            }
        }

        try{
            userExists().then(async (boolean) => {
                if(boolean){
                    authenticationPassword().then(async (boolean) => {
                        if(boolean){
                            authenticationDeleteMessage().then(async (boolean) => {
                                if(boolean){
                                    await User.deleteOne({email: email})
                                    await Task.deleteMany({emailUser: email})

                                    res.json({
                                        message: 'User deleted'
                                    })
                                }else{
                                    res.json({
                                        error: 'delete failed',
                                        message: 'delete message incorrect'
                                    })
                                }
                            })
                        }else{
                            res.json({
                                error: 'delete failed',
                                message: 'incorrect password'
                            })
                        }
                    })
                }else{
                    res.json({
                        error: 'delete failed',
                        message: "user not found"
                    })
                }
            })
        }catch(e){
            return res.status(500).send({
                error: "delete failed",
                message: e,
            });
        }
    }
}

export default new UserController();