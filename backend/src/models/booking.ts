import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
    date_requested: {
        type: "date",
        default: Date.now,
        required: [true, "Date requested of booking is required."],
    },
    purpose: {
        type: "string",
        required: [true, "Give a brief purpose of booking."],
    },
    date_start: {
        type: "date",
        required: [true, "Start date is required."],
    },
    date_end: {
        type: "date",
        required: [true, "End date is required."],
    },
    num_participants: {
        type: "number",
        required: [true, "Estimated number of participants is required."],
    },
    status: {
        type: "number",
        required: [true, "Status is required."],
    },
    id_user: {
        type: "objectId",
        required: [true, "ID user for this booking is required."],
    },
})

const Booking = mongoose.model("Booking", bookingSchema)
export default Booking