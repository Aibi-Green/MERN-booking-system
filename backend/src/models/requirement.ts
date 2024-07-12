import mongoose from 'mongoose'

const requirementSchema = new mongoose.Schema({
    name: {
        type: "string",
        required: [true, "Name for venue requirement is required."],
    },
    id_type: {
        type: "objectId",
        required: [true, "ID type for venue requirement is required."],
    },
})

const Requirement = mongoose.model("Requirement", requirementSchema)
export default Requirement