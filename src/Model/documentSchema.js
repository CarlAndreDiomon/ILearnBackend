import mongoose from "mongoose";

const documentSchema = mongoose.Schema({
    fileUrl: {
        type: String,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    gradeLevel: {
        type: String,
        required: true,
        enum: ["Grade 7","Grade 8","Grade 9","Grade 10","Grade 11","Grade 12",],
    },
    subject: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create the Document model
const Document = mongoose.model("Document", documentSchema);