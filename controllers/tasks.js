const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/async');
//const { createCustomError } = require('../errors/custom-error')

const getAllTasks = asyncWrapper ( async(req,res)=>{
        const tasks = await Task.find({});
        return res.status(200).json({ tasks })
       // return res.status(200).json({ status: 'success', data: {tasks, nbHits: tasks.length}})
})

const createTask = asyncWrapper(async(req,res)=>{

    const { name,completed } = req.body;
    const task = new Task({
        name,
        completed
    })
    await task.save();
    return res.status(200).json({ task })
})

const getTask = asyncWrapper(async(req,res,next)=>{

        //const name = req.params.id;
        const{id:taskID} = req.params;
        const task = await Task.findOne({ _id:taskID })
        if(!task){
        const error = new Error(`No task with id : ${taskID}`);
        error.status = 404
        return next(error)
       // return next(createCustomError(`No task with id : ${taskID}`, 404))
        }
        return res.status(200).json({ task })

})

const updateTask = asyncWrapper(async(req,res,next)=>{

        const{id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{
            new:true,
            runValidators:true
        })
        if(!task){
            //return next(createCustomError(`No task with id : ${taskID}`, 404))
            const error = new Error(`No task with id : ${taskID}`);
            error.status = 404
            return next(error)
            }
        return res.status(200).json({ task })

})

const deleteTask = asyncWrapper(async(req,res,next)=>{

        const{id:taskID} = req.params;
        const task = await Task.findOneAndDelete({ _id:taskID })
        if(!task){
            //return next(createCustomError(`No task with id : ${taskID}`, 404))
            const error = new Error(`No task with id : ${taskID}`);
            error.status = 404
            return next(error)
            }
        return res.status(200).json({ msg: `deleted ${taskID}` })

})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}