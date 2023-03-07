const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        maxLength:[20,'name cannnot more than 20 characters']
    },
    completed:{
        type: Boolean,
        default:false
    }
})

const Task = mongoose.model('Task',taskSchema);
module.exports = Task;