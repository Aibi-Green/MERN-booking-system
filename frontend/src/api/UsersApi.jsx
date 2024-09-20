import { backendUrl } from "../assets/Data"

export const login = (reqBody, setToken) => {
  fetch(`${backendUrl}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  })
    .then(response => response.json())
    .then(json => {
      console.log(json)
      setToken({
        type: "SET_TOKEN",
        payload: json.token
      })
    })
}