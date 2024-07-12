import mongoose from 'mongoose'

const rtypeSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, "Name for venue requirement type is required."],
    },
})

const Rtype = mongoose.model("Rtypes", rtypeSchema)
export default Rtype