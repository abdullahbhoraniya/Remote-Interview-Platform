
import { chatClient } from "../lib/stream.js"

export const  getStreamToken = async(req,res)=>{
    try {
        console.log("Generating stream token for user",req.user._id.toString());
        const token=chatClient.createToken(req.user._id.toString());
        console.log("The token generated is",token);
        res.status(200).json({
            success:true,
            token,
            userId:req.user._id.toString(),
            userName:req.user.name,
            userImage:req.user.profileImage
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Error generating stream token"
        })
    }
}