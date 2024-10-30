import mongoose from "mongoose";
const jobSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    requirements:[{
        type:String,
    }],
    salary:[{
        type:String,
        required:true,

    }],
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    experiencelevel:{
        type:Number,
        required:true
    },
    position:{
        type:String,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Company'
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ]

},{timestamps:true})
export const Job=mongoose.model('Job',jobSchema)