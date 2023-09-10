import { Request, Response } from "express";
import User from '../schemas/User';

class UserController{

    async create(req: Request, res: Response){
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        const { name, email, password } = req.body;

        const isEmailUnique = async () => {
            const array = await User.find({ email: email })

            if(await array.length === 0){
                return true
            }else{
                return false
            }
        }

        try {
            isEmailUnique().then(async (result) => {
                if(result){
                    const user = await User.create({
                        name,
                        email,
                        password,
                    });

                    return res.json(await User.find());
                }else{
                    return res.json({
                        error: "registation failed",
                        message: "this email is already in use"
                    });
                }
            })
        }catch (e) {
            return res.status(500).send({
                error: "registation failed",
                message: e,
            });
        }
    }

    async readAll(req: Request, res: Response){
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        try{
            res.json(await User.find());
        }catch(e){
            return res.status(500).send({
                error: "reading failed",
                message: e,
            });
        }
    }

    async login(req: Request, res: Response){
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
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
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
        const { email, password, updateName, updateEmail, updatePass } = req.body;

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
            const array = await User.find({ email: updateEmail })

            if(await array.length === 0){
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
        res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
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