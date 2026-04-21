import mongoose from "mongoose";

const jobSchema=mongoose.Schema(
    {
        recruiterId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Users'
        },
        title:{
            type:String,
            required:true
        },
        role:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        skills:[
            {
                type:String,
                required:true,
                trim:true
            }
        ],
        experience:{
            type:Number,
            required:true
        },
        location:{
            type:String,
            required:true
        },
        salrayRange:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            enum:["open","close"],
            default:"open"
        },
        totalApplication:{
            type:Number,
            default:0
        },
        createdAt:{
            type:Date,
            default:Date
        }
    },
    {
        timestamps:true
    }
);
jobSchema.index({ recruiterId: 1 });
jobSchema.index({ status: 1 });

const Job=mongoose.model('jobCollection',jobSchema);
export default Job;