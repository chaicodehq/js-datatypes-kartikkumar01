/**
 * 💸 UPI Transaction Log Analyzer
 *
 * Aaj kal sab UPI pe chalta hai! Tujhe ek month ke transactions ka log
 * milega, aur tujhe pura analysis karna hai - kitna aaya, kitna gaya,
 * kiski saath zyada transactions hue, etc.
 *
 * Rules:
 *   - transactions is array of objects:
 *     [{ id: "TXN001", type: "credit"/"debit", amount: 500,
 *        to: "Rahul", category: "food", date: "2025-01-15" }, ...]
 *   - Skip transactions where amount is not a positive number
 *   - Skip transactions where type is not "credit" or "debit"
 *   - Calculate (on valid transactions only):
 *     - totalCredit: sum of all "credit" type amounts
 *     - totalDebit: sum of all "debit" type amounts
 *     - netBalance: totalCredit - totalDebit
 *     - transactionCount: total number of valid transactions
 *     - avgTransaction: Math.round(sum of all valid amounts / transactionCount)
 *     - highestTransaction: the full transaction object with highest amount
 *     - categoryBreakdown: object with category as key and total amount as value
 *       e.g., { food: 1500, travel: 800 } (include both credit and debit)
 *     - frequentContact: the "to" field value that appears most often
 *       (if tie, return whichever appears first)
 *     - allAbove100: boolean, true if every valid transaction amount > 100 (use every)
 *     - hasLargeTransaction: boolean, true if some valid amount >= 5000 (use some)
 *   - Hint: Use filter(), reduce(), sort(), find(), every(), some(),
 *     Object.entries(), Math.round(), typeof
 *
 * Validation:
 *   - Agar transactions array nahi hai ya empty hai, return null
 *   - Agar after filtering invalid transactions, koi valid nahi bacha, return null
 *
 * @param {Array<{ id: string, type: string, amount: number, to: string, category: string, date: string }>} transactions
 * @returns {{ totalCredit: number, totalDebit: number, netBalance: number, transactionCount: number, avgTransaction: number, highestTransaction: object, categoryBreakdown: object, frequentContact: string, allAbove100: boolean, hasLargeTransaction: boolean } | null}
 *
 * @example
 *   analyzeUPITransactions([
 *     { id: "T1", type: "credit", amount: 5000, to: "Salary", category: "income", date: "2025-01-01" },
 *     { id: "T2", type: "debit", amount: 200, to: "Swiggy", category: "food", date: "2025-01-02" },
 *     { id: "T3", type: "debit", amount: 100, to: "Swiggy", category: "food", date: "2025-01-03" }
 *   ])
 *   // => { totalCredit: 5000, totalDebit: 300, netBalance: 4700,
 *   //      transactionCount: 3, avgTransaction: 1767,
 *   //      highestTransaction: { id: "T1", ... },
 *   //      categoryBreakdown: { income: 5000, food: 300 },
 *   //      frequentContact: "Swiggy", allAbove100: false, hasLargeTransaction: true }
 */
export function analyzeUPITransactions(transactions) {
  //validations
  if (!Array.isArray(transactions) || transactions.length === 0) return null;

  //filtering invalid transactions
  transactions = transactions.filter(transaction => (
    transaction.amount > 0 && (transaction.type === 'credit' || transaction.type === 'debit')
  ));

  //checking transactions after filtering
  if (transactions.length === 0) return null;

  //calculations on valid transactions
  const totalCredit = transactions
    .filter(transaction => transaction.type === 'credit')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalDebit = transactions
    .filter(transaction => transaction.type === 'debit')
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const netBalance = totalCredit - totalDebit;

  const transactionCount = transactions.length;

  const avgTransaction = Math.round((totalCredit + totalDebit) / transactionCount);

  //finding out highestTransaction (Descending sort)
  transactions = transactions.sort((t1, t2) => t2.amount - t1.amount);
  const highestTransaction = transactions[0];

  //category breakdown
  const categoryBreakdown = transactions.reduce((acc, transaction) => {
    if (acc.hasOwnProperty(transaction.category)) {
      acc[transaction.category] += transaction.amount;
    } else {
      acc[transaction.category] = transaction.amount;
    }
    return acc;
  }, {})

  //frequent contact
  //reduce se grouped total nikal lunga
  //fir usko based on count sort karunga descending me
  //fir first element ko most frequent bana dunga
  let groupedToCount = transactions.reduce((toCountObj, transaction) => {
    if (toCountObj.hasOwnProperty(transaction.to)) {
      toCountObj[transaction.to] += 1;
    } else {
      toCountObj[transaction.to] = 1;
    }
    return toCountObj
  }, {})
  groupedToCount = Object.entries(groupedToCount).sort((a, b) => b[1] - a[1]);
  const frequentContact = groupedToCount[0][0];


  //check if every transaction amount > 100
  const allAbove100 = transactions.every(transaction => transaction.amount > 100)

  //check if any transaction amount >= 5000
  const hasLargeTransaction = transactions.some(transaction => transaction.amount >= 1000)

  return { 
    totalCredit,
    totalDebit, 
    netBalance, 
    transactionCount, 
    avgTransaction, 
    highestTransaction, 
    categoryBreakdown, 
    frequentContact, 
    allAbove100,
    hasLargeTransaction
  }
}
