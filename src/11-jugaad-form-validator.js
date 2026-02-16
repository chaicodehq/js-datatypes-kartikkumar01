/**
 * 📋 Jugaad Form Validator - Indian Style!
 *
 * India mein form bharna ek art hai! College admission ka form validate
 * karna hai. Har field ke apne rules hain. Tujhe ek errors object return
 * karna hai jisme galat fields ke error messages hain. Agar sab sahi hai
 * toh empty errors object aur isValid = true.
 *
 * formData object:
 *   { name, email, phone, age, pincode, state, agreeTerms }
 *
 * Validation Rules:
 *   1. name: must be a non-empty trimmed string, min 2 chars, max 50 chars
 *      Error: "Name must be 2-50 characters"
 *
 *   2. email: must be a string containing exactly one "@" and at least one "."
 *      after the "@". Use indexOf(), lastIndexOf(), includes().
 *      Error: "Invalid email format"
 *
 *   3. phone: must be a string of exactly 10 digits, starting with 6, 7, 8, or 9
 *      (Indian mobile numbers). Check each char is a digit.
 *      Error: "Invalid Indian phone number"
 *
 *   4. age: must be a number between 16 and 100 inclusive, and an integer.
 *      JUGAAD: Agar string mein number diya hai (e.g., "22"), toh parseInt()
 *      se convert karo. Agar convert nahi ho paya (isNaN), toh error.
 *      Error: "Age must be an integer between 16 and 100"
 *
 *   5. pincode: must be a string of exactly 6 digits, NOT starting with "0"
 *      Error: "Invalid Indian pincode"
 *
 *   6. state: Use optional chaining (?.) and nullish coalescing (??) -
 *      if state is null/undefined, treat as "". Must be a non-empty string.
 *      Error: "State is required"
 *
 *   7. agreeTerms: must be truthy (Boolean(agreeTerms) === true).
 *      Falsy values: 0, "", null, undefined, NaN, false
 *      Error: "Must agree to terms"
 *
 * Return:
 *   { isValid: boolean, errors: { fieldName: "error message", ... } }
 *   - isValid is true ONLY when errors object has zero keys
 *
 * Hint: Use typeof, Boolean(), parseInt(), isNaN(), Number.isInteger(),
 *   ?. (optional chaining), ?? (nullish coalescing), Object.keys(),
 *   startsWith(), trim(), length
 *
 * @param {object} formData - Form fields to validate
 * @returns {{ isValid: boolean, errors: object }}
 *
 * @example
 *   validateForm({
 *     name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210",
 *     age: 20, pincode: "400001", state: "Maharashtra", agreeTerms: true
 *   })
 *   // => { isValid: true, errors: {} }
 *
 *   validateForm({
 *     name: "", email: "bad-email", phone: "12345", age: 10,
 *     pincode: "0123", state: null, agreeTerms: false
 *   })
 *   // => { isValid: false, errors: { name: "...", email: "...", ... } }
 */

function isObject(value){
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function validateForm(formData) {
  // //validation
  // if(!isObject(formData)) return null;

  const response = {
    isValid : true,
    errors : {}
  }

  //destructuring
  let  { name, email, phone, age, pincode, state, agreeTerms } = formData;

  //name validation
  const nameLength = name.trim().length
  if(nameLength < 2 || nameLength > 50){
    response.isValid = false;
    response.errors.name = "Name must be 2-50 characters";
  }

  //email validation
  //indexof === lastIndexOf means character is exactly coming only one time
  const exactOneatTheRate = email.includes('@') && (email.indexOf('@') === email.lastIndexOf('@'))
  const minOneDotAfterAtTheRate = email.indexOf('.', email.indexOf('@')) !== -1
  if(!exactOneatTheRate || !minOneDotAfterAtTheRate){
    response.isValid = false;
    response.errors.email = "Invalid email format";
  }

  //phone validation
  phone = [...phone]
  const everyPhoneCharDigit = phone.every(char => char.charCodeAt() >= 48 && char.charCodeAt() <= 57)
  const exactly10PhoneDigits = phone.length === 10
  const startingFrom6 = phone[0].charCodeAt() >= 54;
  if(!everyPhoneCharDigit || !exactly10PhoneDigits || !startingFrom6){
    response.isValid = false;
    response.errors.phone = "Invalid Indian phone number";
  }

  //age validation
  age = Number(age);
  const isAgeInteger = !isNaN(age) && Number.isInteger(age);
  const ageInRange = age >= 16 && age <= 100
  if(!isAgeInteger || !ageInRange){
    response.isValid = false;
    response.errors.age = "Age must be an integer between 16 and 100";
  }

  //pincode validation
  pincode = [...pincode]
  const everyPincodeCharDigit = pincode.every(char => char.charCodeAt() >= 48 && char.charCodeAt() <= 57)
  const exactly6PincodeDigits = pincode.length === 6
  const pincodeNotStartingWith0 = pincode[0].charCodeAt() !== 48
  if(!everyPincodeCharDigit || !exactly6PincodeDigits || !pincodeNotStartingWith0){
    response.isValid = false;
    response.errors.pincode = "Invalid Indian pincode";
  }

  //state validation
  //?. or ?() => It returns undefined rather than error if we try to access undefined property or method
  //?? => It returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
  const stateNotEmpty = state?.length ?? 0;
  if(!stateNotEmpty){
    response.isValid = false;
    response.errors.state = "State is required";
  }

  //agreeTerms Validation
  if(!Boolean(agreeTerms)){
    response.isValid = false;
    response.errors.agreeTerms = "Must agree to terms";
  }

  return response;
}
