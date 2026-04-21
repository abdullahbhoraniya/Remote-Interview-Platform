import mongoose from "mongoose";

const recruiterSchema=new mongoose.Schema({
    userId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',   
    },
    recruiterName:{
        type: String,
        required: true
    },
    workEmail:
    {
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        required: true
    },
    company:{
        name: String,
        website: String,
        domain:String
    },
    linkedIn:String,
    isAccountVeriFied:{
        type:Boolean,
        default:false
    }
    ,
    status:{
        type:String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    isEmailVerified:{
        type: Boolean,
        default: false
    },
    totalInterviewCreated:{
        type:Number,
        default:0
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        required:false
    }
},{timestamps:true});

const Recruiter=mongoose.model("Recruiter",recruiterSchema);
export default Recruiter;