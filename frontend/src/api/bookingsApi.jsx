import { backendUrl } from "../assets/Data"

// Get All bookings of all accounts
export const getBookings = (onData) => {
  fetch(`${backendUrl}/bookings`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => onData(json.data))
    .catch(error => console.error(error))
}

// Get All bookings of specified user ID
export const getUserBookings = (id, onData) => {
  fetch(`${backendUrl}/bookings/user/${id}`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => onData(json.data))
    .catch(error => console.error(error))
}

// Get One Booking of a userID with its requirements
export const viewBooking = (id, onData, isLoading) => {
  isLoading(true)

  fetch(`${backendUrl}/bookings/booking/${id}`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(jsonBooking => {
      fetch(`${backendUrl}/rbookings/booking/${id}`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(jsonReqs => {
          fetch(`${backendUrl}/rtypes`, {
            method: "GET"
          })
            .then(response => response.json())
            .then(jsonTypes => {
              onData({
                ...jsonBooking.data,
                requirements: jsonReqs.data,
                types: jsonTypes.data
              })
              isLoading(false)
            })
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

export const addBooking = (loggedInUserID, payload) => {
  console.log("addBooking");
  

  fetch(`${backendUrl}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      date_requested: payload.date_requested,
      purpose: payload.purpose,
      date_start: payload.date_start,
      date_end: payload.date_end,
      num_participants: payload.num_participants,
      status: 0,
      id_user: loggedInUserID
    })
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      console.log(json.id_booking)
      console.log("payload requirements: ", payload.requirements)

      fetch(`${backendUrl}/rbookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id_booking: json.id_booking,
          id_requirements: payload.requirements
        })
      })
        .then(response => response.json())
        .then(json => {
          console.log(json)
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}

export const editBooking = (id) => {
  console.log("editBooking: ", id);
}

export const deleteBooking = (id) => {
  console.log("deleteBooking: ", id);
  fetch(`${backendUrl}/bookings/booking/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error(error))
}