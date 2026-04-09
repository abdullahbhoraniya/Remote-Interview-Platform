import mongoose from 'mongoose';

const sessionSchema=new mongoose.Schema({
    problem:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:['easy','medium','hard'],
        required:true
    },
    host:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Users',
    required:true
    },
    participant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    status:{
        type:String,
        enum:['active','completed','pending'],
        default:'active'
    },
    callId:{
        type:String,
        default:""
    }
},
{timestamps:true})

const Session=mongoose.model("Session",sessionSchema);

export default Session;