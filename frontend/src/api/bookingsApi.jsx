const backendUrl = "http://localhost:8080"

export const getBookings = (onData) => {
  fetch(`${backendUrl}/bookings`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => onData(json.data))
    .catch(error => console.error(error))
}

export const viewBooking = (id, onData) => {
  
  fetch(`${backendUrl}/bookings/booking/${id}`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => onData(json))
    .catch(error => console.error(error))
}

export const addBooking = () => {
  console.log("addBooking");
}

export const editBooking = () => {
  console.log("editBooking");
}

export const deleteBooking = () => {
  console.log("deleteBooking");
}