import { backendUrl } from "../assets/Data"

// ADMIN
// Get All bookings of all accounts
export const getBookings = (onData) => {
  fetch(`${backendUrl}/bookings`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => onData(json.data))
    .catch(error => console.error(error))
}

// USER
// Get All bookings of specified user ID
export const getUserBookings = (id, urlSearchStr="", onData) => {
  // console.log("urlSearchStr: ", urlSearchStr);
  
  fetch(`${backendUrl}/bookings/user/${id}${urlSearchStr}`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => {
      // console.log({
      //   type: 'SET_BOOKINGS',
      //   payload: json.data
      // });
      
      onData({
        type: 'SET_BOOKINGS',
        payload: json.data
      })
    })
    .catch(error => console.error(error))
}

// USER || ADMIN
// Get One Booking of a userID with its requirements
// TODO: bookings/booking still requires two fetch requests to get both booking and requirement details
export const viewBooking = (id, onData, isLoading = () => { }) => {
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

// USER
export const addBooking = (loggedInUserID, payload) => {
  const details = {
    purpose: payload.purpose,
    date_start: payload.date_start,
    date_end: payload.date_end,
    num_participants: payload.num_participants,
    status: 0,
    id_user: loggedInUserID
  }

  fetch(`${backendUrl}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(details)
  })
    .then(response => response.json())
    .then(json => {
      // console.log(json)
      // console.log(json.id_booking)
      // console.log("payload requirements: ", payload.requirements)

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

// USER
export const editBooking = (id_booking, payload) => {
  // console.log("editBooking: ", id_booking);
  // console.log("PAYLOAD: ", payload);

  // Edits Booking details
  fetch(`${backendUrl}/bookings/booking/${id_booking}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      purpose: payload.purpose,
      date_start: payload.date_start,
      date_end: payload.date_end,
      num_participants: payload.num_participants
    })
  })
    .then(response => response.json())
    .then(json => {
      console.log(json);
      // console.log("REQUIREMENTS: ", payload.requirements);

      // Deletes all existing bookings requirements
      fetch(`${backendUrl}/rbookings/booking/${id_booking}`, {
        method: "DELETE"
      })
        .then(response => response.json())
        .then(json => {
          console.log(json);

          fetch(`${backendUrl}/rbookings`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id_booking: id_booking,
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
    })
    .catch(error => console.error(error))
}

// USER
export const deleteBooking = async (id, onData) => {
  // console.log("deleteBooking: ", id);
  await fetch(`${backendUrl}/bookings/booking/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      onData({
        type: 'DELETE_BOOKING',
        id: id
      });      
    })
    .catch(error => console.error(error))
}

// USER
export const searchUserBookings = async (id, payload, onData) => {
  console.log("SEARCH BOOKINGS:");
  console.log("ID => ", id);
  console.log("PAYLOAD => ", payload);

  // fetch(`${backendUrl}/bookings/user/${id}`, {
  //   method: "GET"
  // })
  //   .then(response => response.json())
  //   .then(json => {
  //     // console.log({
  //     //   type: 'SET_BOOKINGS',
  //     //   payload: json.data
  //     // });
      
  //     onData({
  //       type: 'SET_BOOKINGS',
  //       payload: json.data
  //     })
  //   })
  //   .catch(error => console.error(error))

}