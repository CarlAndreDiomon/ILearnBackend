import { Document } from "../Model/documentSchema.js";





export const getModulesGroupedByGrade = async (req, res) => {
    try {
        const grades = ["Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"];
        const grouped = {};
        
        for (const grade of grades) {
            const modules = await Document.find({ gradeLevel: grade }).sort({ createdAt: -1});
            grouped[grade] = modules;
        }

        res.status(200).json(grouped);

    } catch (error) {
        console.error("Error fetching grouped modules:", err);
        res.status(500).json({ message: "Server Error" });
    }
};