import { generateToken } from "../lib/utils.js";
import Admin from "../Model/adminModel.js";
import bcrypt from "bcryptjs";
import { StudentLoginLog, Teacher, TeacherLoginLog } from "../Model/usersSchema.js";

export const registerAdmin = async (req, res) => {
    const { adminName, adminPassword } = req.body;

    try {
        const existingAdmin = await Admin.findOne({adminName});
        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        if ( adminPassword.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminPassword, salt);

        const newAdmin = new Admin({ 
            adminName, 
            adminPassword: hashedPassword 
        });
        await newAdmin.save();
            return res.status(201).json({ message: "Admin registered successfully" });
        }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const loginAdmin = async (req, res) => {
    const {adminName, adminPassword} = req.body;

    try {
        if(
            !adminName || !adminPassword
        ){
            return res.status(400).json({ message: "Please enter all fields" });
        }


        const admin = await Admin.findOne({ adminName });
        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(adminPassword, admin.adminPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

         // Send the response with the token and user information
        const token = generateToken(admin._id, 'admin', res);
        // Set the token in the response header
        res.setHeader("Authorization", `Bearer ${token}`);

        return res.status(200).json({ message: "Login successful",  
            message: "Admin Login successfully",
            token,
            _id: admin._id,
            fullName: admin.adminName,
            role: "admin",
        });
        
    } catch (error) {
        console.error("admin controller error",error);
        return res.status(500).json({ message: "Server error" });
    }
}

export const getAdmin = async (req, res) => {
    try {
        const admins = await Admin.find();
        if (!admins) {
            return res.status(404).json({ message: "No admins found" });
        }
        return res.status(200).json(admins);
    } catch (error) {
        console.error("admin controller error",error);
        return res.status(500).json({ message: "Server error" });
    }
}

// // Function to register a teacher
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

        if(password.length < 6){   
            return res.status(400).send({message: "Password should be at least 6 characters"})
        }
        // Check if the email is valid
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: "Invalid email format" });
        }
        // Check if the student already exists
        let teacher = await Teacher.findOne({email});
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

// Teacher and student logs
export const getStudentLogs = async (req, res) => {
    try {
      const logs = await StudentLoginLog.find().sort({ loginTime: -1 });
  
      const simplifiedLogs = logs.map(log => ({
        name: log.fullName,
        id: log.studentId,
        time: new Date(log.loginTime).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        })
      }));
  
      res.status(200).json(simplifiedLogs);
    } catch (err) {
      console.error("Error fetching student login logs:", err);
      res.status(500).json({ message: "Server error while fetching logs" });
    }
  };

export const getTeacherLogs = async (req, res) => {
    try {
      const logs = await TeacherLoginLog.find().sort({ loginTime: -1 });
  
      const simplifiedLogs = logs.map(log => ({
        name: log.fullName,
        id: log.teacherId,
        time: new Date(log.loginTime).toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false
        })
      }));
  
      res.status(200).json(simplifiedLogs);
    } catch (err) {
      console.error("Error fetching teacher login logs:", err);
      res.status(500).json({ message: "Server error while fetching logs" });
    }
  };
  