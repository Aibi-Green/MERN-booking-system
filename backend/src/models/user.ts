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
        required: [true, "Contact Person is a required field"],
    },
    contact_number: {
        type: "string",
        required: [true, "Contact Number is a required field"],
    },
    email: {
        type: "string",
        required: [true, "Email is a required field"],
    },
    address: {
        type: "string",
    },
})

const User = mongoose.model("User", userSchema)
export default User