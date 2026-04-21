import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
        unique: true
    },
    skills: [
        {
            type: String,
            trim: true
        }
    ],
    experience: {
        type: Number,
        default: 0
    },
    education: {
        degree: String,       // BTech, BE, MCA
        branch : String,       // CS, IT, Mechanical
        college: String,
        graduationYear: Number
    },
    linkedin: String,
    
    resumeUrl: {
        type: String,
        require: true
    },
    isPremium: {
        type: Boolean,
        default: false
    },
    premiumExpiresAt: {
        type: Date
    },
    totalinterviews: {
        type: Number,
        default: 0,
        required: false
    },
    rating: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

export const Profile = mongoose.model("Profile", profileSchema);

