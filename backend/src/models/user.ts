import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
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
    },
    contact_person: {
        type: "string",
        required: true,
    },
    contact_number: {
        type: "string",
        required: true,
    },
    email: {
        type: "string",
        required: true,
    },
    address: {
        type: "string",
    },
})

const User = mongoose.model("User", userSchema)
export default User