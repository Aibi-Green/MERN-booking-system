import { purposes } from '../../assets/Data.jsx'

// Regex Validations
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  return usernameRegex.test(username)
}

function validateContactNumber(contact_number) {
  const contactNumberRegex = /^\d{10}$/
  return contactNumberRegex.test(contact_number)
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  return passwordRegex.test(password)
}

/** 🟢
 * Validates the field values of AddbookingForm
 * 
 * @param {function(Object)} setValidations - a callback function that sets validation on the component its invoked on.
 * @param {object} fieldValues - Ab object that contains field values to validate.
 * @param {string} fieldValues.purpose - The purpose of the booking.
 * @param {string} fieldValues.date_start - The start date in ISO 8601 format (YYYY-MM-DD).
 * @param {string} fieldValues.date_end - The end date in ISO 8601 format (YYYY-MM-DD).
 * @param {number} fieldValues.num_participants - The number of participants/guests.
 * @param {string[]} fieldValues.requirements - An array containing requirement IDs.
 */

export const handleBookingFormValidations = (setValidations, fieldValues) => {  
  let errors = {}  

  if (!fieldValues.purpose || !purposes.some(i => i === fieldValues.purpose)) {
    errors.purpose = "Please select a valid purpose"
  }

  if (!fieldValues.date_start || !fieldValues.date_end) {
    errors.date = "Please select valid start and end dates"
  }
  else if (fieldValues.date_start > fieldValues.date_end) {
    errors.date = "Start date should be set before end date"
  }
  else if (
    ((new Date(fieldValues.date_end)).getDate() - (new Date(fieldValues.date_start)).getDate()) == 0 &&
    ((new Date(fieldValues.date_end)).getTime() - (new Date(fieldValues.date_start)).getTime()) < 3600000) {
    errors.date = "Start and end date must be 1 hour or 1 day apart"
  }

  if (fieldValues.num_participants && fieldValues.num_participants > 5000) {
    errors.num_participants = "Please enter a number below the maximum number of guests."
  } else if (fieldValues.num_participants == 0) {
    errors.num_participants = "Please enter a number greater than 0 for guests."
  }

  if (fieldValues.requirements && fieldValues.requirements != null && fieldValues.requirements.length == 0) {
    errors.requirements = "Please pick at least one place under venue requirements"
  }

  setValidations(errors)
}

/** ❌
 * Validates the field values of Register Form
 * `
 * @param {function(Object)} setValidations - a callback function that sets validation on the component its invoked on.
 * @param {object} fieldValues - Ab object that contains field values to validate.
 * @param {string} fieldValues.purpose - The purpose of the booking.
 * @param {string} fieldValues.date_start - The start date in ISO 8601 format (YYYY-MM-DD).
 * @param {string} fieldValues.date_end - The end date in ISO 8601 format (YYYY-MM-DD).
 * @param {number} fieldValues.num_participants - The number of participants/guests.
 * @param {string[]} fieldValues.requirements - An array containing requirement IDs.
 */
export const handleRegisterFormValidations = (setValidations, fieldValues) => {
  const errors = {}

  if (!fieldValues.email) {
    errors.email = "Please enter an email"
  } else if (!validateEmail(fieldValues.email)) {
    errors.email = "Email is not valid"
  }


  if (!fieldValues.username) {
    errors.username = "Please enter a username"
  } else if (!validateUsername(fieldValues.username)) {
    errors.username = "Username should only contain letters, numbers, and an underscore"
  }

  if (!fieldValues.name) {
    errors.name = "Please enter your organization's name"
  }

  if (!fieldValues.contact_person) {
    errors.contact_person = "Please enter the contact person's full name"
  }

  if (!fieldValues.contact_number) {
    errors.contact_number = "Please enter active phone number"
  } else if (!validateContactNumber(fieldValues.contact_number)) {
    errors.contact_number = "Please enter a valid phone number"
  }

  if (!fieldValues.password) {
    errors.password = "Please enter a password"
  } else if (!validatePassword(fieldValues.password)) {
    errors.password = "Password must have at least one lowercase letter, one uppercase letter, one number, and one special character"
  }

  if (!fieldValues.confirm_password && !fieldValues.password) {
    errors.confirm_password = "Please enter a password first"
  } else if (fieldValues.confirm_password && fieldValues.password) {
    if (fieldValues.confirm_password != fieldValues.password) {
      errors.confirm_password = "Passwords do not match"
    }
  } else if (fieldValues.password && !fieldValues.confirm_password) {
    errors.confirm_password = "Passwords do not match"
  }

  setValidations(errors)
}

/**✅
 * Login Validations
 * 
 * @param {function} setValidations 
 * @param {object} fieldValues Contains the following:
 * @param {string} fieldValues.email
 * @param {string} fieldValues.password
 */
export const handleLoginValidations = (setValidations, fieldValues) => {
  let errors = {}
  if (!fieldValues.email) {
    errors.email = "Email is required"
  } else if (!validateEmail(fieldValues.email)) {
    errors.email = "Email is not valid"
  }

  if (!fieldValues.password) {
    errors.password = "Password is required"
  }

  setValidations(errors)
}

/**🟡
 * Edit Account Validations
 * 
 * @param {function} setErrors 
 * @param {object} fieldValues 
 */
export const handleEditAccFormValidations = (setValidations, fieldValues) => {
  const errors = {}

  if (!fieldValues.email) {
    errors.email = "Please enter an email"
  } else if (!validateEmail(fieldValues.email)) {
    errors.email = "Email is not valid"
  }


  if (!fieldValues.username) {
    errors.username = "Please enter a username"
  } else if (!validateUsername(fieldValues.username)) {
    errors.username = "Username should only contain letters, numbers, and an underscore"
  }

  if (!fieldValues.name) {
    errors.name = "Please enter your organization's name"
  }

  if (!fieldValues.contact_person) {
    errors.contact_person = "Please enter the contact person's full name"
  }

  if (!fieldValues.contact_number) {
    errors.contact_number = "Please enter active phone number"
  } else if (!validateContactNumber(fieldValues.contact_number)) {
    errors.contact_number = "Please enter a valid phone number"
  }
  
  setValidations(errors)
}