import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
{
    adminName: {
        type: String,
        required: true,
    },
    adminPassword: {
        type: String,
        required: true,
    },

},
{
    timestamps: true,
}
);    

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;