import { Schema, model, Model } from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

// Create an interface representing a document in MongoDB
interface IUser {
    username: string;
    password: string;
    name: string;
    contact_person: string;
    contact_number: string;
    email: string;
    address: string;
}

// create in interface that extends mongoose model for statics
interface UserModel extends Model<IUser> {
    signup(user: Object): Object;
    changeUserDetails(id: string, details: Object): Object;
}

// Create schema corresponding to the document interface
const userSchema = new Schema<IUser, UserModel>({
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

// statics
userSchema.static("signup", async function signup(user) {
    if (!user.email || !user.username) {
        throw new Error("Username or Email is required!")
    }
    if (!validator.isEmail(user.email)) {
        throw new Error("Username or Email is not valid!")
    }
    if (!validator.isStrongPassword(user.password)) {
        throw new Error("Password not strong enough!")
    }

    const emailExists = await this.findOne({ email: user.email })

    if (emailExists) {
        throw new Error('Email already exists!')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(user.password, salt)

    const newUser = await this.create({
        password: hash,
        name: user.name,
        username: user.username,
        contact_person: user.contact_person,
        contact_number: user.contact_number,
        email: user.email,
        address: user.address
    })

    return newUser
})

userSchema.static("changeUserDetails", async function changeUserDetails(id, details) {
    console.log("ID: ", id);
    console.log("Details:");
    console.log(details);
    
    let user = await this.find({_id: id}).exec()
    if (user.length == 0) {
        // if the User ID to be updated does not exist
        throw new Error("User ID does not exist")
    }

    let username = await this.find({username: details.username}).exec()
    if (username.length > 0) {
        throw new Error("Username already exists")
    }

    const updatedUser = await this.updateOne({_id: id}, details)

    return {}
})

// create model
const User = model<IUser, UserModel>("User", userSchema)


export default User