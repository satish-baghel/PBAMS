export const checkRequiredValidationWithMinMax = (
  text,
  fieldName,
  min,
  max,
  required = true
) => {
  let error = ''
  if (required === true) {
    if (text === '') {
      return (error = fieldName + ' field is required')
    }
  }
  if (text.length < min) {
    error = fieldName + 'field must be greater than ' + min + ' characters'
  }
  if (text.length > max) {
    error = fieldName + 'field must be less than ' + max + ' characters'
  }
  return error
}

export const checkEmailValidation = (emailText, required = true) => {
  let error = ''

  if (required === true) {
    if (emailText === '') {
      return (error = 'This field is required')
    }
  }

  const pattern =
    /^[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*@[a-z0-9]+([a-z0-9]+)*(\.[a-z0-9]+([a-z0-9]+)*)*\.[a-z]{2,4}$/
  if (pattern.test(emailText)) {
    return ''
  } else {
    error = 'Bad email address: ' + emailText
  }
  return error
}

export const checkMultipleChekboxSelectionWithMinMax = (
  array,
  min = 0,
  max = 10000000
) => {
  let ids = []
  array.forEach((element, index) => {
    if (element === true) {
      ids.push(index)
    }
  })
  let response = {}
  response.error = ''
  response.data = ids
  if (ids.length < min) {
    response.error = 'Minimum ' + min + ' item selections is required'
  }

  if (ids.length > max) {
    response.error = 'Maximum item selections is ' + min
  }
  return response
}

export const checkEmptyValidation = (field, fieldName) => {
  let error = ''

  if (field === '') {
    error = fieldName + ' field is required'
  }
  return error
}

// export const checkMobileNumberValidation = (field, fieldName) => {
//   let error = "";

//   if (field === "") {
//     error = fieldName + " field is required";
//   }
//   field = parseInt(field);
//   if (!Number.isInteger(field)) {
//     error = fieldName + " field must be a number";
//   }
//   return error;
// };
export const checkMobileNumberValidation = (field, fieldName) => {
  let error = ''
  var pattern = new RegExp(/^[0-9\b]+$/)
  if (field === '') {
    error = fieldName + ' field is required'
  } else if (!pattern.test(field)) {
    error = 'Please enter only number.'
  }
  // else if (field.length != 10) {
  //   error = "Please enter valid phone number.";
  // }
  return error
}
