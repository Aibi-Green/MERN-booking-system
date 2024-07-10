import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    username: {
        type: "string",
        required: [true, "Username is a required field"],
    },
    password: {
        type: "string",
        required: [true, "Password is a required field"],
    },
    name: {
        type: "string",
        required: [true, "Name is a required field"],
    },
})

const Admin = mongoose.model("Admin", adminSchema)
export default Admin