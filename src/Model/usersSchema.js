import mongoose from "mongoose";

// Student Schema
const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    gradeLevel: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// Create the Student model
const Student = mongoose.model("Student", studentSchema);
// Student Login Log Schema
const studentLoginLogSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    loginTime: {
        type: Date,
        default: Date.now,
    },
});
// Create the StudentLoginLog model
const StudentLoginLog = mongoose.model("StudentLoginLog", studentLoginLogSchema);
//  Teacher Schema
const teacherSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});
// Create the Teacher model
const Teacher = mongoose.model("Teacher", teacherSchema);
// Teacher Login Log Schema
const teacherLoginLogSchema = new mongoose.Schema({
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    loginTime: {
        type: Date,
        default: Date.now,
    },
});
// Create the TeacherLoginLog model
const TeacherLoginLog = mongoose.model("TeacherLoginLog", teacherLoginLogSchema);
// Export the models
export { Student, Teacher, StudentLoginLog, TeacherLoginLog };

