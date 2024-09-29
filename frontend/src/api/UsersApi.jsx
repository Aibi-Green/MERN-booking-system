import { backendUrl } from "../assets/Data"

/**✅
 * Login
 * 
 * @param {object} form 
 * @param {string} form.email
 * @param {string} form.password
 * @param {function} setToken 
 * @param {function} setUser 
 * @param {function} setValidations
 * @returns 
 */
export const login = async (form, setToken, setValidations) => {
  try {
    const controller = new AbortController()
    const response = await fetch(
      `${backendUrl}/users/login`,
      {
        signal: controller.signal,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      }
    )

    if (!response.ok) {
      const error = await response.json()
      setValidations({ all: error.message })
      throw new Error(error.message)
    }

    const json = await response.json()
    console.log(json)

    setToken(json.token, json.email)

    return () => controller.abort()
  } catch (e) {
    console.error(e)
  }
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

/**✅
 * Get One User Details
 * 
 * @param {string} id UserID
 * @param {function} setData 
 * @param {function} isLoading 
 */
export const getOneUser = async (token, setData) => {
  try {
    const controller = new AbortController()

    const response = await fetch(
      `${backendUrl}/users/profile`,
      {
        signal: controller.signal,
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error)
    }

    const json = await response.json()
    console.log(json);

    setData(json.data[0])

    return () => {
      controller.abort()
    }
  } catch (e) {
    console.error(e)
  }
}

/**🟡
 * Edit Account Details
 * 
 * @param {string} token 
 * @param {object} form 
 * @param {string} form.username?
 * @param {string} form.email?
 * @param {string} form.name?
 * @param {string} form.contact_person?
 * @param {string} form.contact_number?
 * @param {boolean} setIsLoading 
 */
export const editAccountDetails = async (token, form, setIsLoading) => {
  try {
    const controller = new AbortController()

    const response  = await fetch(
      `${backendUrl}/users/profile`,
      {
        signal: controller.signal,
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      }
    )

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message)
    }

    const json = await response.json()
    console.log(json);
    console.log(Object.keys(form));
    
    setIsLoading(false)

    return () => controller.abort()
    
  } catch (e) {
    console.error(e)
  }
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