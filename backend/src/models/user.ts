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
    login(input: Object): Object;
    changeUserDetails(id: string, details: Object): Object;
    changePassword(id: string, details: Object): Object;
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
    if (!user.password) {
        throw new Error("Password is required!")
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

userSchema.static("login", async function login(input) {
    if (!input.email || !input.password) {
        throw new Error("All fields must be filled...")
    }

    const user = await this.findOne({email: input.email})

    if (!user) {
        throw new Error("Incorrect email.")
    }

    const match = await bcrypt.compare(input.password, user.password)

    if (!match) {
        throw new Error("Invalid login credentials")
    }
    
    return user
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

    // let username = await this.find({username: details.username}).exec()
    // if (username.length > 0) {
    //     throw new Error("Username already exists")
    // }

    if(details.password) {
        delete details.password
    }

    const updatedUser = await this.updateOne({_id: id}, details)

    return updatedUser
})

userSchema.static("changePassword", async function changeUserDetails(id, details) {
    console.log("ID: ", id);
    console.log("Details:");
    console.log(details);
    
    let user = await this.find({_id: id}).exec()
    if (user.length == 0) {
        // if the User ID to be updated does not exist
        throw new Error("User ID does not exist")
    }

    if (!details.curr_password || !details.new_password) {
        throw new Error("All fields must be filled...")
    }    

    const isMatch = await bcrypt.compare(details.curr_password, user[0].password)

    if (!isMatch) {
        throw new Error("Current password does not match stored password")
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/

    if (!passwordRegex.test(details.new_password)) {
        throw new Error("Password should have at least one lowercase letter, one uppercase letter, one number, and one special character")
    }

    const bsalt = await bcrypt.genSalt(10)
    const bhash = await bcrypt.hash(details.new_password, bsalt)

    const updatedUser = await this.updateOne({_id: id}, {
        password: bhash
    })

    return updatedUser
})

// create model
const User = model<IUser, UserModel>("User", userSchema)


export default User