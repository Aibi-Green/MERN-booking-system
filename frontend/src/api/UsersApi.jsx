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
      if (json.status == "fail") {
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

  const json = await response.json()

  if (response.ok) {
    console.log(json);
    // setToken(response.json().token)
  } else {
    console.log(json);
  }
}


export const getOneUser = async (id, onData, isLoading) => {
  console.log("GETTING ONE USER");
  isLoading(true)

  const response = await fetch(`${backendUrl}/users/${id}`, {
    method: "GET"
  })

  const json = await response.json()

  if (response.ok) {
    console.log(json);
    onData(json.data)
  } else {
    console.log(json);
  }

  isLoading(false)

}

export const editAccountDetails = async (id, reqBody, setErrors) => {
  console.log("EDIT ACCOUNT DETAILS");

  console.log(reqBody);

  const response = await fetch(`${backendUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  })

  const json = await response.json()
  console.log(json);
  setErrors(json)
}

export const editAccountPassword = async (id, reqBody, setErrors) => {
  console.log("EDIT ACCOUNT PASSWORD");

  console.log(reqBody);

  const response = await fetch(`${backendUrl}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(reqBody)
  })

  const json = await response.json()

  console.log(json);
  setErrors(json)
}