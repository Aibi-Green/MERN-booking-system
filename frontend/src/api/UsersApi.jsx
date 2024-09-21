import { backendUrl } from "../assets/Data"

export const login = (reqBody, setToken, setErrors) => {
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
      setToken(json.token)
      if(json.status == "fail") {
        setErrors(json.message)
      } else {
        setErrors("")
      }
    })
}