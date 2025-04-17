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
        type: mongoose.Schema.Types.ObjectId,
        ref: "GradeLevel",
        required: true,
      },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Create the Document model
const Document = mongoose.model("Document", documentSchema);