import Admin from "../Model/adminModel.js";
import bcrypt from "bcryptjs";

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

        return res.status(200).json({ message: "Login successful",  
            admin 
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