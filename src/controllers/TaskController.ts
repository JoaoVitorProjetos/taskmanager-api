import { Request, Response } from "express";
import Task from "../schemas/Task";
import User from "../schemas/User";

class TaskController{
    async create(req: Request, res: Response){
        const { email, task } = req.body;

        const userExists = async () => {
            const array = await User.find({ email: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        const taskExists = async () => {
            const array = await Task.find({ task: task, emailUser: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        try{
            userExists().then(async (boolean) => {
                if(boolean){
                    taskExists().then(async (boolean) => {
                        if(!boolean){
                            const taskCreated = await Task.create({
                                task: task,
                                emailUser: email
                            });

                            return res.json({
                                message: 'task created'
                            });
                        }else{
                            return res.json({
                                message: 'create task filed',
                                error: 'task already exists'
                            });
                        }
                    })
                }else{
                    return res.json({
                        message: 'create task failed',
                        error: 'user not found'
                    })
                }
            })
        }catch(e){ 
            return res.json({
                message: 'create task filed',
                error: e
            })
        }
    }

    async find(req: Request, res: Response){
        const { email } = req.body
        
        const userExists = async () => {
            const array = await User.find({ email: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            } 
        }

        try{
            userExists().then(async (boolean) => {
                if(boolean){
                        const tasks = await Task.find({
                            emailUser: email
                        });

                        return res.json(tasks);
                }else{
                    return res.json({
                        message: 'find task failed',
                        error: 'user not found'
                    })
                }
            })
        }catch(e){
            return res.json({
                message: 'find tasks filed',
                error: e
            })
        }
    }

    async update(req: Request, res: Response){
        const { email, task, updateTask } = req.body;

        const userExists = async () => {
            const array = await User.find({ email: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        const taskExists = async () => {
            const array = await Task.find({ task: task, emailUser: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        const taskUpdatedExists = async () => {
            const array = await Task.find({ task: updateTask, emailUser: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        try{
            userExists().then(async (boolean) => {
                if(boolean){
                    taskExists().then(async (boolean) => {
                        if(boolean){
                            taskUpdatedExists().then(async (boolean) => {
                                if(!boolean){
                                    await Task.updateOne({ emailUser: email, task: task}, {
                                        $set: {task: updateTask, emailUser: email}
                                    })

                                    res.json({
                                        message: 'task updated'
                                    })
                                }else{
                                    res.json({
                                        message: 'update task filed',
                                        error: 'updateTask already exists'
                                    })
                                }
                            })
                        }else{
                            res.json({
                                message: 'update task failed',
                                error: 'task not found'
                            })
                        }
                    })
                }else{
                    res.json({
                        message: 'update task failed',
                        error: 'user not found'
                    })
                }
            })
        }catch(e){
            res.json({
                message: 'update task failed',
                error: e
            })
        }
    }

    async delete(req: Request, res: Response){
        const { email, task } = req.body;

        const userExists = async () => {
            const array = await User.find({ email: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        const taskExists = async () => {
            const array = await Task.find({ task: task, emailUser: email })

            if(await array.length != 0){
                return true
            }else{
                return false
            }
        }

        try{
            userExists().then(async (boolean) => {
                if(boolean){
                    taskExists().then(async (boolean) => {
                        if(boolean){
                            await Task.deleteOne({
                                task: task,
                                emailUser: email
                            });

                            return res.json({
                                message: 'task deleted'
                            });
                        }else{
                            return res.json({
                                message: 'delete task filed',
                                error: 'task not found'
                            });
                        }
                    })
                }else{
                    return res.json({
                        message: 'delete task failed',
                        error: 'user not found'
                    })
                }
            })
        }catch(e){ 
            return res.json({
                message: 'delete task filed',
                error: e
            })
        }
    }
    
}

export default new TaskController();