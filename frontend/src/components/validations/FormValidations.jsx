import { purposes } from '../../assets/Data.jsx'

export const handleBookingFormValidations = (setValidations, purpose, startDate, endDate, guests, requirementsID) => {
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

function validateEmail (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateUsername (username) {
  const usernameRegex = /^[a-zA-Z0-9_]+$/
  return usernameRegex.test(username)
}

function validateContactNumber (contact_number) {
  const contactNumberRegex = /^\d{10}$/
  return contactNumberRegex.test(contact_number)
}

function validatePassword (password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
  return passwordRegex.test(password)
}

export const handleAccountFormValidations = (setErrors, fieldValues) => {
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

  setErrors(errors)
}