import { Student, Teacher, StudentLoginLog, TeacherLoginLog } from "../Model/usersSchema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";

// Function to register a student
export const registerStudent = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {

        
        if(
            !fullName ||
            !email ||
            !password 
        ){
            return res.status(400).send({message: "Complete All fields"})
        }

        if(password.length < 6){   
            return res.status(400).send({message: "Password should be at least 6 characters"})
        }
        // Check if the email is valid
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "Invalid email format" });
        }
        // Check if the student already exists
        let student = await Student.findOne({email});
        if(student){
            return res.status(400).send({message: "Student already exist!"})
        }


        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newStudent = new Student({
            fullName,
            email,
            password: hashedPassword,
        });

        await newStudent.save();
        return res.status(201).send({message: "Student created successfully",
            _id: newStudent._id,
            fullName: newStudent.fullName,
            email: newStudent.email,
        })
    } catch (error) {
        res.status(500).json({ message: "Error registering student", error });
        console.error("Error registering student:", error);
    }
};

// Function to login a student
export const loginStudent = async(req, res) => {
    const {fullName, password} = req.body;

    try {
        if(
            !fullName ||
            !password
        ){
            return res.status(400).send({message: "Please enter all fields"})
        }

        const student = await Student.findOne({fullName})
        if(!student){
            return res.status(400).send({message: 'User not exists'})
        }

        const isPasswordCorrect = await bcrypt.compare(password, student.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Wrong credentials"})
        }

        // Check if the student is already logged in
        const existingLoginLog = await StudentLoginLog.findOne({ studentId: student._id });
        if (existingLoginLog) {
            return res.status(400).json({ message: "Student is already logged in" });
        }
        // Create a new login log entry
        const newStudentLoginLog = new StudentLoginLog({
            studentId: student._id,
            fullName: student.fullName,
            email: student.email,
            loginTime: new Date()
          });

        await newStudentLoginLog.save();
        // Send the response with the token and user information
        generateToken(student._id, 'student', res);

        return res.status(200).send({
            message: "Login successfully",
            _id: student._id,
            username: student.fullName,
            email: student.email,
            role: 'student',
        });
    } catch (error) {
        console.error("Error in studentController login", error)
        return res.status(400).send({message: "Internal server error"});
    }
}

// Function to login a teacher
export const loginTeacher = async(req, res) => {
    const {fullName, password} = req.body;
    try {
        if(
            !fullName ||
            !password
        ){
            return res.status(400).send({message: "Please complete all fields"});
        }

        const teacher = await Teacher.findOne({fullName});
        if(!teacher){
            return res.status(400).send({message: "User not exists"})
        }
        const isPasswordCorrect = await bcrypt.compare(password, teacher.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message: "Wrong credentials"});
        }

        // Check if the teacher is already logged in
         const existingLoginLog = await TeacherLoginLog.findOne({ teacherId: teacher._id });
         if (existingLoginLog) {
             return res.status(400).json({ message: "Teacher is already logged in" });
        }
        // Create a new login log entry
        const newTeacherLoginLog = new TeacherLoginLog({
            teacherId: teacher._id,
            fullName: teacher.fullName,
            email: teacher.email,
            loginTime: new Date()
          });
        // Save the login log entry to the database

        await newTeacherLoginLog.save();
        
        // Send the response with the token and user information
        generateToken(teacher._id, 'teacher', res);
        
        return res.status(200).send({
            message: "Login successfully",
            token,
            _id: teacher._id,
            fullName: teacher.fullName,
            email: teacher.email,
            role: "teacher",
        });
    } catch (error) {
        console.error("Error in teacherController login", error)
        return res.status(400).send({message: "Internal server error"});
    }
};

export const logout = (req, res) => {
    try {
      res.cookie("jwt", "", { maxAge: 0 });
      res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      console.log("Error in logout controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

