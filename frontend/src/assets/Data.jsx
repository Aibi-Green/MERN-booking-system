// current day
const today = new Date()
today.setHours(6, 0, 0, 0)
export const currentDay = today

// date set 1 day after the current day
let minStartDate = new Date(today.setDate(today.getDate() + 1))
export const minStartDateTime = minStartDate

// date set 3 days and 1 hour after the current day and time
let endMinDate = new Date(today.setDate(today.getDate()))
endMinDate.setTime(endMinDate.getTime() + 3600000)
export const endMinDateTime = endMinDate

// date set 3 days and 1 hour after the current day and time
let endDate = new Date(today.setDate(today.getDate() + 3))
endDate.setTime(endDate.getTime() + 3600000)
export const endDateTime = endDate

export const formatDate = (dateString) => {
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }

  return new Date(dateString).toLocaleDateString("en-US", options)
}

export const formatTime = (dateString) => {
  let options = {
    hour: '2-digit',
    minute: '2-digit'
  }

  return new Date(dateString).toLocaleTimeString("en-US", options)
}

export const bookings = [
  {
    _id: "66b5b74842298956d171b375",
    purpose: "wedding",
    date_start: "2024-08-22T16:00:00.000Z",
    date_end: "2024-08-23T16:00:00.000Z",
    num_participants: 20,
    status: 0,
    id_user: "6653956aa49a7d296304da37",
    date_requested: "2024-08-09T06:29:28.072Z",
    requirements: {
      indoor: [{ name: "indoor1" }],
      outdoor: [{ name: "indoor1" }, { name: "indoor2" }],
      additional: []
    },
    __v: 0
  },
  {
    _id: "66b5b74842298956d1712375",
    purpose: "birthday",
    date_start: "2024-08-01T16:00:00.000Z",
    date_end: "2024-08-23T16:00:00.000Z",
    num_participants: 20,
    status: 1,
    id_user: "6653956aa49a7d296304da37",
    date_requested: "2024-08-09T06:29:28.072Z",
    requirements: {
      indoor: [{ name: "indoor1" }, { name: "indoor2" }, { name: "indoor3" }],
      outdoor: [{ name: "indoor1" }, { name: "indoor2" }],
      additional: [{ name: "indoor1" }]
    },
    __v: 0
  },
  {
    _id: "66b5b74842298956d171b365",
    purpose: "Prom",
    date_start: "2024-09-15T18:00:00.000Z",
    date_end: "2024-09-15T22:00:00.000Z",
    num_participants: 20,
    status: 2,
    id_user: "6653956aa49a7d296304da37",
    date_requested: "2024-08-09T06:29:28.072Z",
    requirements: {
      indoor: [{ name: "indoor1" }, { name: "indoor2" }],
      outdoor: [],
      additional: [{ name: "indoor1" }]
    },
    __v: 0
  }
]

export const users = [
  {
    _id: "6653956aa49a7d296304da37",
    email: "",
    password: "",
    name_indiv_company: "",
    contact_person: "",
    contact_number: "",
    address: ""
  }
]

export const purposes = [
  {_id: 1, name: "Wedding"}, 
  {_id: 2, name: "Party"}, 
  {_id: 3, name: "Birthday"}, 
  {_id: 4, name: "Prom"}
]

export const statuses = [
  "All", "Approved", "Pending", "Rejected"
]

export const types = [
  {
    _id: 1,
    name: "Indoor"
  },{
    _id: 2,
    name: "Outdoor"
  },{
    _id: 3,
    name: "Additional"
  }
]

export const requirements = [
  {
    _id: "1",
    name: "Art Gallery",
    id_type: "1",
  },{
    _id: "2",
    name: "Dunes Cafe",
    id_type: "1",
  },{
    _id: "3",
    name: "Cinema",
    id_type: "1",
  },{
    _id: "4",
    name: "Stadium 1",
    id_type: "1",
  },{
    _id: "5",
    name: "Community Kitchen",
    id_type: "1",
  },{
    _id: "6",
    name: "Auditorium",
    id_type: "1",
  },{
    _id: "7",
    name: "Play Cafe",
    id_type: "1",
  },{
    _id: "8",
    name: "Equipment Hire",
    id_type: "1",
  },{
    _id: "9",
    name: "Stadium 2",
    id_type: "1",
  },{
    _id: "10",
    name: "Community Youth Centre",
    id_type: "1",
  },{
    _id: "11",
    name: "Green Room",
    id_type: "1",
  },{
    _id: "12",
    name: "Library Meeting Space",
    id_type: "1",
  },{
    _id: "13",
    name: "Office Space",
    id_type: "1",
  },{
    _id: "14",
    name: "Squash Courts",
    id_type: "1",
  },{
    _id: "16",
    name: "Netball Court 1",
    id_type: "2",
  },{
    _id: "17",
    name: "Tennis Courts",
    id_type: "2",
  },{
    _id: "18",
    name: "Small Oval",
    id_type: "2",
  },{
    _id: "19",
    name: "Outdoor Pool",
    id_type: "2",
  },{
    _id: "20",
    name: "Pool Party",
    id_type: "2",
  },{
    _id: "21",
    name: "Netball Court 2",
    id_type: "2",
  },{
    _id: "22",
    name: "Town Oval",
    id_type: "2",
  },{
    _id: "23",
    name: "Soccer Field",
    id_type: "2",
  },{
    _id: "24",
    name: "Indoor Pool",
    id_type: "2",
  },{
    _id: "25",
    name: "Catering (including alcohol sales)",
    id_type: "3",
  },{
    _id: "26",
    name: "AV Equipment",
    id_type: "3",
  },{
    _id: "27",
    name: "Additional Equipment",
    id_type: "3",
  },
]

export const booking_requirement = [
  {
    _id: "1",
    id_booking: "66b5b74842298956d171b375",
    id_requirement: "6"
  },{
    _id: "2",
    id_booking: "66b5b74842298956d171b375",
    id_requirement: "7"
  },{
    _id: "3",
    id_booking: "66b5b74842298956d171b375",
    id_requirement: "8"
  },{
    _id: "4",
    id_booking: "66b5b74842298956d171b375",
    id_requirement: "15"
  },{
    _id: "5",
    id_booking: "66b5b74842298956d171b375",
    id_requirement: "16"
  },{
    _id: "6",
    id_booking: "66b5b74842298956d171b375",
    id_requirement: "24"
  },{
    _id: "7",
    id_booking: "66b5b74842298956d1712375",
    id_requirement: "6"
  },{
    _id: "8",
    id_booking: "66b5b74842298956d1712375",
    id_requirement: "7"
  },{
    _id: "9",
    id_booking: "66b5b74842298956d1712375",
    id_requirement: "15"
  },{
    _id: "10",
    id_booking: "66b5b74842298956d1712375",
    id_requirement: "16"
  },{
    _id: "11",
    id_booking: "66b5b74842298956d1712375",
    id_requirement: "24"
  },{
    _id: "12",
    id_booking: "66b5b74842298956d171b365",
    id_requirement: "6"
  },{
    _id: "13",
    id_booking: "66b5b74842298956d171b365",
    id_requirement: "15"
  },{
    _id: "14",
    id_booking: "66b5b74842298956d171b365",
    id_requirement: "16"
  },{
    _id: "15",
    id_booking: "66b5b74842298956d171b365",
    id_requirement: "24"
  }
]

export const requirements_mock = {
  indoor: ["Art Gallery", "Dunes Cafe", "Cinema", "Stadium 1"],
  outdoor: ["Netball Court 1", "Tennis Courts", "Small Oval", "Outdoor Pool"],
  additional: ["Catering", "AV Equipment", "Additional Equipment"]
}

let arr = types

arr.map(type => {
  type.places = []

  requirements.filter((req) => {
    if (req.id_type == type._id) {
      type.places.push(req)
    }
  })
})

export const formattedRequirements = arr
