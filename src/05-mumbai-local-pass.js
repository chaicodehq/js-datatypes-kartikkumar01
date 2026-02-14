/**
 * 🚂 Mumbai Local Train Pass Generator
 *
 * Aaj se tu Mumbai local ka digital pass system bana raha hai! Passenger
 * ka data milega aur tujhe ek formatted pass string generate karni hai.
 * Pass mein sab details honi chahiye ek specific format mein.
 *
 * Rules:
 *   - passenger object mein required fields: name, from, to, classType
 *   - classType must be "first" ya "second" (case-insensitive check)
 *   - Pass ID generate karo:
 *     classType ka first char uppercase + from ke pehle 3 letters uppercase
 *     + to ke pehle 3 letters uppercase
 *     Example: "first", "dadar", "andheri" => "F" + "DAD" + "AND" = "FDADAND"
 *   - Output format using template literal:
 *     Line 1: "MUMBAI LOCAL PASS"
 *     Line 2: "---"
 *     Line 3: "Name: <NAME IN UPPERCASE>"
 *     Line 4: "From: <From in Title Case>"
 *     Line 5: "To: <To in Title Case>"
 *     Line 6: "Class: <FIRST or SECOND>"
 *     Line 7: "Pass ID: <PASSID>"
 *   - Title Case = first letter uppercase, rest lowercase
 *   - Lines are separated by \n (newline)
 *   - Hint: Use template literals, slice(), toUpperCase(), toLowerCase(),
 *     charAt(), typeof
 *
 * Validation:
 *   - Agar passenger object nahi hai ya null hai, return "INVALID PASS"
 *   - Agar koi required field (name, from, to, classType) missing hai
 *     ya empty string hai, return "INVALID PASS"
 *   - Agar classType "first" ya "second" nahi hai, return "INVALID PASS"
 *
 * @param {{ name: string, from: string, to: string, classType: string }} passenger
 * @returns {string} Formatted pass or "INVALID PASS"
 *
 * @example
 *   generateLocalPass({ name: "rahul sharma", from: "dadar", to: "andheri", classType: "first" })
 *   // => "MUMBAI LOCAL PASS\n---\nName: RAHUL SHARMA\nFrom: Dadar\nTo: Andheri\nClass: FIRST\nPass ID: FDADAND"
 *
 *   generateLocalPass(null)
 *   // => "INVALID PASS"
 */
function isObject(value){
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function generatePassId(passenger){
  const {classType, from, to} = passenger;
  return (classType.charAt(0) + from.slice(0,3) + to.slice(0,3)).toUpperCase();
}
export function generateLocalPass(passenger) {
  //validations
  if(!isObject(passenger)) return 'INVALID PASS';
  const classTypes = ['first', 'second'];
  if(!classTypes.includes(passenger.classType.toLowerCase())) return 'INVALID PASS';

  //Checking if object contains all the required properties and are not empty strings
  const requiredFields = ['name', 'from', 'to', 'classType'];
  for(let i = 0; i<requiredFields.length; i++){
    if(!passenger.hasOwnProperty(requiredFields[i]) || passenger[requiredFields[i]] === '') return 'INVALID PASS';
  }

  //destructuring the passenger object
  let {name,classType, from, to} = passenger;
  const passId = generatePassId(passenger);
  name = name.toUpperCase();
  classType = classType.toUpperCase();
  to = to.charAt(0).toUpperCase() + to.slice(1).toLowerCase();
  from = from.charAt(0).toUpperCase() + from.slice(1).toLowerCase();

  return `MUMBAI LOCAL PASS\n---\nName: ${name}\nFrom: ${from}\nTo: ${to}\nClass: ${classType}\nPass ID: ${passId}`;
  
}
