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

/** ✅
 * getUserBookings: Get All bookings of specified user ID
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

/**✅
 * ViewBooking: Get One Booking of a userID with its requirements
 * 
 * @param {string} token 
 * @param {string} id_booking 
 * @param {function} onData - a callback function that sends the result
 * @param {boolean} isLoading 
 */
export const viewBooking = async (token, id_booking, onData, isLoading) => {
  try {
    isLoading(true)

    const bookingController = new AbortController()
    const bookingResponse = await fetch(
      `${backendUrl}/bookings/booking/${id_booking}`,
      {
        signal: bookingController.signal,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (!bookingResponse.ok) {
      const error = await bookingResponse.json()
      throw new Error(error.message)
    }

    const bookingJson = await bookingResponse.json()
    console.log(bookingJson);

    const rbookController = new AbortController()

    const rbookResponse = await fetch(
      `${backendUrl}/rbookings/booking/${id_booking}`,
      {
        signal: rbookController.signal,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (!rbookResponse.ok) {
      const error = await rbookResponse.json()
      throw new Error(error.message)
    }

    const rbookJson = await rbookResponse.json()
    console.log(rbookJson);

    const requirements = rbookJson.data.map(i => i.id_requirement)

    onData({
      ...bookingJson.data,
      requirements: requirements
    })

    return () => {
      bookingController.abort()
      rbookController.abort()
    }
  } catch (e) {
    console.error(e)
  } finally {
    isLoading(false)
  }
}

/** ✅
 * AddBooking: Add booking with requirements
 * 
 * @param {string} token 
 * @param {object} payload
 * @param {string} payload.purpose - The purpose of the booking.
 * @param {string} payload.date_start - The start date in ISO 8601 format (YYYY-MM-DD).
 * @param {string} payload.date_end - The end date in ISO 8601 format (YYYY-MM-DD).
 * @param {number} payload.num_participants - The number of participants/guests.
 * @param {number[]} payload.requirements - An array containing requirement IDs.
 */
export const addBooking = async (token, payload, setIsLoading) => {
  try {
    const bookingController = new AbortController();
    const reqBookingController = new AbortController();

    const resBookings = await fetch(
      `${backendUrl}/bookings`,
      {
        signal: bookingController.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      }
    )

    if (!resBookings.ok) {
      const error = await resBookings.json()
      throw new Error(error.message)
    }

    const jsonBookings = await resBookings.json()
    console.log(jsonBookings)

    const resReqBookings = await fetch(
      `${backendUrl}/rbookings/booking/${jsonBookings.id_booking}`,
      {
        signal: reqBookingController.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          id_requirement: payload.requirements
        })
      }
    )

    if (!resReqBookings.ok) {
      const error = await resReqBookings.json()
      throw new Error(error.message)
    }

    const jsonReqBookings = await resReqBookings.json()
    console.log(jsonReqBookings);

    setIsLoading(false)

    return () => {
      bookingController.abort()
      reqBookingController.abort()
    }

  } catch (e) {
    console.error(e)
  }
}

/**🟡
 * EditBooking: Edit a Booking
 * involves adding booking details first then
 * deleting all requirements and add the new updated
 * requirements from payload
 * 
 * @param {string} token 
 * @param {object} payload
 * @param {string} payload.purpose? - The purpose of the booking.
 * @param {string} payload.date_start? - The start date in ISO 8601 format (YYYY-MM-DD).
 * @param {string} payload.date_end? - The end date in ISO 8601 format (YYYY-MM-DD).
 * @param {number} payload.num_participants? - The number of participants/guests.
 * @param {string[]} payload.requirements? - An array containing requirement IDs.
 */
export const editBooking = async (token, id_booking, payload, isLoading) => {
  try {
    isLoading(true)
    const controllers = []

    // First Booking Details
    const payloadBooking = {}

    Object.keys(payload).forEach(i => {
      if ((payload[i] != '' || payload[i] != 0) && i != 'requirements') {
        payloadBooking[i] = payload[i]
      }
    })

    if (Object.keys(payloadBooking) != 0) {
      const controllerBooking = new AbortController()
      controllers.push(controllerBooking)

      const responseBooking = await fetch(
        `${backendUrl}/bookings/booking/${id_booking}`,
        {
          signal: controllerBooking.signal,
          method: "PUT",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payloadBooking)
        }
      )

      if (!responseBooking.ok) {
        const error = await responseBooking.json()
        throw new Error(error.message)
      }

      const jsonResponseBooking = await responseBooking.json()
      console.log(jsonResponseBooking)
    }

    // Second Add Booking Requirements
    if (payload.requirements.add_places.length != 0) {
      const payloadRbookingAdd = {
        id_requirement: payload.requirements.add_places
      }

      const controllerRbookingAdd = new AbortController()
      controllers.push(controllerRbookingAdd)

      const responseRbookingAdd = await fetch(
        `${backendUrl}/rbookings/booking/${id_booking}`,
        {
          signal: controllerRbookingAdd.signal,
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payloadRbookingAdd)
        }
      )

      if (!responseRbookingAdd.ok) {
        const error = await responseRbookingAdd.json()
        throw new Error(error.message)
      }

      const jsonResponseRbookingAdd = await responseRbookingAdd.json()
      console.log(jsonResponseRbookingAdd);
    }

    // Third Remove Booking Requirements
    if (payload.requirements.remove_places.length != 0) {
      const payloadRbookingRemove = {
        id_requirement: payload.requirements.remove_places
      }

      const controllerRbookingRemove = new AbortController()
      controllers.push(controllerRbookingRemove)

      const responseRbookingRemove = await fetch(
        `${backendUrl}/rbookings/booking/${id_booking}`,
        {
          signal: controllerRbookingRemove.signal,
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payloadRbookingRemove)
        }
      )

      if (!responseRbookingRemove.ok) {
        const error = await responseRbookingRemove.json()
        throw new Error(error.message)
      }

      const jsonResponseRbookingRemove = await responseRbookingRemove.json()
      console.log(jsonResponseRbookingRemove);
    }

    isLoading(false)

    return () => {
      controllers.forEach(fn => {
        fn.abort()
      })
    }

  } catch (e) {
    console.error(e)
  }
}

/**✅
 * DeleteBooking: Delete one Booking
 * 
 * @param {string} id_booking 
 * @param {string} token
 * @param {function} onData For dispatch for booking context
 */
export const deleteBooking = async (token, id_booking, onData) => {
  try {
    const controller = new AbortController()
    const response = await fetch(
      `${backendUrl}/bookings/booking/${id_booking}`,
      {
        signal: controller.signal,
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const json = await response.json()
    console.log(json);

    onData({
      type: "DELETE_BOOKING",
      id: id_booking
    })

    return () => controller.abort()

  } catch (e) {
    console.error(e)
  }
}