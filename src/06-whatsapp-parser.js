/**
 * 💬 WhatsApp Message Parser
 *
 * Chintu ek WhatsApp chat analyzer bana raha hai. Usse raw WhatsApp
 * exported message line parse karni hai aur usme se date, time, sender,
 * aur message alag alag extract karna hai.
 *
 * WhatsApp export format:
 *   "DD/MM/YYYY, HH:MM - Sender Name: Message text here"
 *
 * Rules:
 *   - Date extract karo: string ke start se pehle ", " (comma-space) tak
 *   - Time extract karo: ", " ke baad se " - " (space-dash-space) tak
 *   - Sender extract karo: " - " ke baad se pehle ": " (colon-space) tak
 *   - Message text extract karo: pehle ": " ke baad (after sender) sab kuch, trimmed
 *   - wordCount: message ke words count karo (split by space, filter empty strings)
 *   - Sentiment detection (case-insensitive check on message text):
 *     - Agar message mein "😂" ya ":)" ya "haha" hai => sentiment = "funny"
 *     - Agar message mein "❤" ya "love" ya "pyaar" hai => sentiment = "love"
 *     - Otherwise => sentiment = "neutral"
 *     - Agar dono match hote hain, "funny" gets priority
 *   - Hint: Use indexOf(), substring()/slice(), includes(), split(),
 *     trim(), toLowerCase()
 *
 * Validation:
 *   - Agar input string nahi hai, return null
 *   - Agar string mein " - " nahi hai ya ": " nahi hai (after sender), return null
 *
 * @param {string} message - Raw WhatsApp exported message line
 * @returns {{ date: string, time: string, sender: string, text: string, wordCount: number, sentiment: string } | null}
 *
 * @example
 *   parseWhatsAppMessage("25/01/2025, 14:30 - Rahul: Bhai party kab hai? 😂")
 *   // => { date: "25/01/2025", time: "14:30", sender: "Rahul",
 *   //      text: "Bhai party kab hai? 😂", wordCount: 5, sentiment: "funny" }
 *
 *   parseWhatsAppMessage("01/12/2024, 09:15 - Priya: I love this song")
 *   // => { date: "01/12/2024", time: "09:15", sender: "Priya",
 *   //      text: "I love this song", wordCount: 4, sentiment: "love" }
 */
export function parseWhatsAppMessage(message) {
  //Agar input string nahi hai, return null
  if(message === null || typeof message !== 'string') return null;

  //Agar string mein " - " nahi hai return null
  if(!message.includes(' - ')) return null;

  //ya ": " nahi hai (after sender), return null
  if(!message.includes(': ')) return null;

  const commaSpaceIndex = message.indexOf(', ');
  const spaceDashSpaceIndex = message.indexOf(' - ');
  const colonSpaceIndex = message.indexOf(': ');

  //Extracting the date
  const date = message.slice(0, commaSpaceIndex);

  //Extracting the time
  const time = message.slice(commaSpaceIndex + 2, spaceDashSpaceIndex);

  //Extracting the sender name
  const sender = message.slice(spaceDashSpaceIndex + 3, colonSpaceIndex);

  //Extracting the message (REMOVING TRAILING AND LEADING SPACES)
  let text = message.slice(colonSpaceIndex + 2).trim();

  //Counting the words of message (REMOVING MIDDLE SPACES)
  let textWordsArray = text.split(' ');
  textWordsArray = textWordsArray.filter(word => word !== ''); //removing empty strings
  const wordCount = textWordsArray.length;
  text = textWordsArray.join(' ');

  //sentiment detection
  let sentiment = 'neutral'; //default
  const sentiments = {
    funny : ["😂", ":)", "haha"],
    love : ["❤", "love", "pyaar"]
  }

  if(sentiments.funny.some(funnyStr => text.toLowerCase().includes(funnyStr))) sentiment = 'funny';
  else if(sentiments.love.some(loveStr => text.toLowerCase().includes(loveStr))) sentiment = 'love';

  return { date, time, sender,text, wordCount, sentiment};
}

