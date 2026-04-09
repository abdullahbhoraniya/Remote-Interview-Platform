import mongoose from 'mongoose'

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true
    })

const User = mongoose.model("Users", userschema);

export default User;