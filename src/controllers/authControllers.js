import { Student, Teacher } from "../Model/usersSchema.js";
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
            password: newStudent.password,
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
        // Send the response with the token and user information
        const token = generateToken(student._id, res);
        // Set the token in the response header
        res.setHeader("Authorization", `Bearer ${token}`);
        // Send the response with the token and user information
        res.status(200).json({
            message: "Login successfully",
            token,
            _id: student._id,
            username: student.fullName,
            email: student.email
        });
    } catch (error) {
        console.error("Error in studentController login", error)
        return res.status(400).send({message: "Internal server error"});
    }
}

// Function to register a teacher
export const registerTeacher = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {

        if(
            !fullName ||
            !email ||
            !password 
        ){
            return res.status(400).send({message: "Complete All fields"})
        }
        // Check if the student already exists
        let teacher = await Student.findOne({email});
        if(teacher){
            return res.status(400).send({message: "Teacher already exist!"})
        }
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newTeacher = new Teacher({
            fullName,
            email,
            password: hashedPassword,
        });

        await newTeacher.save();

        return res.status(201).send({message: "Teacher created successfully",
            fullName: newTeacher.fullName,
            email: newTeacher.email,
            password: newTeacher.password,
        })
    } catch (error) {
        res.status(500).json({ message: "Error registering teacher", error });
        console.error("Error registering teacher:", error);
    }
};

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

        
        // Send the response with the token and user information
        const token = generateToken(teacher._id, res);
        // Set the token in the response header
        res.setHeader("Authorization", `Bearer ${token}`);
        // Send the response with the token and user information
        res.json({
            message: "Login successfully",
            token,
            _id: teacher._id,
            fullName: teacher.fullName,
            email: teacher.email
        })
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
