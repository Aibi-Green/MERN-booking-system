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

// Creates a combined formatted Typed and Requirements for form
export const getTypesAndReq = (onData) => {
  fetch(`${backendUrl}/rtypes`, {
    method: "GET"
  })
    .then(response => response.json())
    .then(jsonTypes => {
      // console.log(jsonTypes.data)

      fetch(`${backendUrl}/requirements`, {
        method: "GET"
      })
        .then(response => response.json())
        .then(jsonReqs => {
          // console.log(jsonReqs.data)
          let arr = jsonTypes.data

          arr.map(type => {
            type.places = []

            jsonReqs.data.filter((req) => {
              if (req.id_type == type._id) {
                type.places.push(req)
              }
            })
          })

          onData(arr)
        })
        .catch(error => console.error(error))
    })
    .catch(error => console.error(error))
}