import { purposes } from '../../assets/Data.jsx'

export const handleUserFormValidations = (setValidations, purpose, startDate, endDate, guests, requirementsID) => {
  let errors = []

  if (purpose.length === 0 || !purposes.some(i => i === purpose)) {
    errors.push("Please select a valid purpose.")
  }

  if (startDate == null || endDate == null) {
    errors.push("Please select valid start and end dates.")
  } else if (startDate > endDate) {
    errors.push("Start date should be set before end date.")
  } else if (((new Date(endDate)).getDate() - (new Date(startDate)).getDate()) == 0 &&
    ((new Date(endDate)).getTime() - (new Date(startDate)).getTime()) < 3600000) {
    errors.push("Start and end date must be 1 hour or 1 day apart.")
  } 
  // else {
  //   console.log("END DATE: ", endDate, "\nTYPE OF: ", typeof(endDate));
  //   console.log("START DATE: ", startDate, "\nTYPE OF: ", typeof(startDate));
  // }

  if (guests > 5000) {
    errors.push("Please enter a number below the maximum number of guests.")
  } else if (guests == 0) {
    errors.push("Please enter a number greater than 0 for guests.")
  }

  if (requirementsID.length == 0) {
    errors.push("Please pick at least one place under venue requirements.")
  }

  setValidations(errors)
}