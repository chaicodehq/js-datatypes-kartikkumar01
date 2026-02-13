/**
 * 🎬 Bollywood Movie Title Fixer
 *
 * Pappu ne ek movie database banaya hai lekin usne saare titles galat type
 * kar diye - kuch ALL CAPS mein, kuch all lowercase mein, kuch mein extra
 * spaces hain. Tu fix kar de titles ko proper Title Case mein!
 *
 * Rules:
 *   - Extra spaces hatao: leading, trailing, aur beech ke multiple spaces ko
 *     single space banao
 *   - Har word ka pehla letter uppercase, baaki lowercase (Title Case)
 *   - EXCEPTION: Chhote words jo Title Case mein lowercase rehte hain:
 *     "ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"
 *     LEKIN agar word title ka PEHLA word hai toh capitalize karo
 *   - Hint: Use trim(), split(), map(), join(), charAt(), toUpperCase(),
 *     toLowerCase(), slice()
 *
 * Validation:
 *   - Agar input string nahi hai, return ""
 *   - Agar string trim karne ke baad empty hai, return ""
 *
 * @param {string} title - Messy Bollywood movie title
 * @returns {string} Cleaned up Title Case title
 *
 * @example
 *   fixBollywoodTitle("  DILWALE   DULHANIA   LE   JAYENGE  ")
 *   // => "Dilwale Dulhania Le Jayenge"
 *
 *   fixBollywoodTitle("dil ka kya kare")
 *   // => "Dil ka Kya Kare"
 */
export function fixBollywoodTitle(title) {
  //validations
  if(typeof title !== 'string') return '';

  //removing trailing and leading spaces
  title = title.trim();
  
  if(title === '') return '';

  const requiredLowerCaseWords = ["ka", "ki", "ke", "se", "aur", "ya", "the", "of", "in", "a", "an"];

  //removing middle spaces
  const titleSplitArrayWithEmptyStrings = title.split(' ');
  const words = titleSplitArrayWithEmptyStrings.filter(item => item != '');

  //make first letter uppercase
  const upperCaseWords = words.map(word => {
    word = word.toLowerCase();
    if(requiredLowerCaseWords.includes(word)) return word;
    return word.charAt(0).toUpperCase() + word.slice(1);
  })

  //making first word first letter uppercase
  upperCaseWords[0] = upperCaseWords[0].charAt(0).toUpperCase() + upperCaseWords[0].slice(1);

  //making string back from array
  return upperCaseWords.join(' ');
}
