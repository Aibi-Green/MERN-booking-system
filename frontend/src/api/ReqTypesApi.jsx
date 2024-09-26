import { backendUrl } from "../assets/Data"

// only gets all types
export const getTypes = (onData) => {
  fetch(`${backendUrl}/rtypes`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => onData(json.data))
    .catch(error => console.error(error))
}

// only gets all requirements
export const getRequirements = (onData) => {
  fetch(`${backendUrl}/requirements`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(json => onData(json.data))
    .catch(error => console.error(error))
}

// ✅ Creates a combined formatted Typed and Requirements for form
export const getTypesAndReq = async (onData, isLoading) => {
  isLoading(true)

  try {
    const responseTypes = await fetch(`${backendUrl}/rtypes`, {
      method: "GET"
    })
    const jsonTypes = await responseTypes.json()

    const responseReqs = await fetch(`${backendUrl}/requirements`, {
      method: "GET"
    })

    const jsonReqs = await responseReqs.json()

    let formattedReqs = jsonTypes.data

    formattedReqs.map(type => {
      type.places = []

      jsonReqs.data.filter((req) => {
        if (req.id_type == type._id) {
          type.places.push(req)
        }
      })
    })

    isLoading(false)
    onData(formattedReqs)
  } catch (e) {
    console.error(e)
  }
}