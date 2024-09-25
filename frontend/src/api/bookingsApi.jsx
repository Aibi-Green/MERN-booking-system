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

/** 🟡
 * Get All bookings of specified user ID
 * w/ search function
 * 
 * @param {string} token
 * @param {string} loggedInUserId
 * @param {string} urlSearchStr
 * @param {string} onData
 */ 
export const getUserBookings = async (token, urlSearchStr, dispatch) => {
  try {
    const controller = new AbortController()

    const url = `${backendUrl}/bookings/user${urlSearchStr}`
    const request = {
      signal: controller.signal,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    }
    
    const response = await fetch(url, request)
  
    if (response.ok) {
      const json = await response.json()

      console.log(json)

      dispatch({
        type: 'SET_BOOKINGS',
        payload: json.data
      })
    }

    return () => controller.abort()
  } catch (e) {
    console.error(e)
  }
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

/** 🟡
 * Add booking
 * 
 * @param {string} token 
 * @param {object} payload
 * @param {string} payload.purpose - The purpose of the booking.
 * @param {string} payload.date_start - The start date in ISO 8601 format (YYYY-MM-DD).
 * @param {string} payload.date_end - The end date in ISO 8601 format (YYYY-MM-DD).
 * @param {number} payload.num_participants - The number of participants/guests.
 * @param {number[]} payload.requirements - An array containing requirement IDs.
 */
export const addBooking = async (token, payload) => {
  try {
    const resBookings = await fetch(
      `${backendUrl}/bookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      }
    )

    const jsonBookings = await resBookings.json()

    if (jsonBookings.ok)
      console.log(jsonBookings)
    else
      console.error(jsonBookings)

    const resReqBookings = await fetch(
      `${backendUrl}/rbookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id_booking: jsonBookings.id_booking,
          id_requirements: payload.requirements
        })
      }
    )

    const jsonReqBookings = await resReqBookings.json()

    if (jsonReqBookings.ok)
      console.log(jsonReqBookings)
    else
      console.error(jsonReqBookings)

  } catch (e) {
    console.error(e)
  }
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