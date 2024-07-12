import mongoose from 'mongoose'

const rbookingSchema = new mongoose.Schema({
    id_booking: {
        type: "objectId",
        required: [true, "Booking ID is required."],
    },
    id_requirement: {
        type: "objectId",
        required: [true, "Venue Requirement ID is required."],
    },
}, {_id: false})

const Rbooking = mongoose.model("Rbooking", rbookingSchema)
export default Rbooking