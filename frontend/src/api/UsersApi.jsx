import { backendUrl } from "../assets/Data"

export const login = (reqBody, setToken, setErrors) => {
  console.log("LOGGING IN");
  
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

export const signup = async (reqBody) => {
  console.log("SIGNING UP ACCOUNT");
  
  const response = await fetch(`${backendUrl}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  })

  if (response.ok) {
    const json = await response.json()
    console.log(json);
    // setToken(response.json().token)
  }

}