/**
 * 🏏 IPL Auction Purse Manager
 *
 * IPL mega auction chal rahi hai! Team ka total purse (budget) diya hai
 * aur players ki list di hai jinhe khareedna hai. Tujhe calculate karna
 * hai ki team ne kitna spend kiya, kitna bacha, aur kuch stats banana hai.
 *
 * Rules:
 *   - team object: { name: "CSK", purse: 9000 } (purse in lakhs)
 *   - players array: [{ name: "Dhoni", role: "wk", price: 1200 }, ...]
 *   - role can be: "bat", "bowl", "ar" (all-rounder), "wk" (wicketkeeper)
 *   - Calculate:
 *     - totalSpent: sum of all player prices (use reduce)
 *     - remaining: purse - totalSpent
 *     - playerCount: total players bought
 *     - costliestPlayer: player object with highest price
 *     - cheapestPlayer: player object with lowest price
 *     - averagePrice: Math.round(totalSpent / playerCount)
 *     - byRole: object counting players per role using reduce
 *       e.g., { bat: 3, bowl: 4, ar: 2, wk: 1 }
 *     - isOverBudget: boolean, true agar totalSpent > purse
 *   - Hint: Use reduce(), filter(), sort(), find(), every(), some(),
 *     Array.isArray(), Math.round(), spread operator
 *
 * Validation:
 *   - Agar team object nahi hai ya team.purse positive number nahi hai, return null
 *   - Agar players array nahi hai ya empty hai, return null
 *
 * @param {{ name: string, purse: number }} team - Team info with budget
 * @param {Array<{ name: string, role: string, price: number }>} players
 * @returns {{ teamName: string, totalSpent: number, remaining: number, playerCount: number, costliestPlayer: object, cheapestPlayer: object, averagePrice: number, byRole: object, isOverBudget: boolean } | null}
 *
 * @example
 *   iplAuctionSummary(
 *     { name: "CSK", purse: 9000 },
 *     [{ name: "Dhoni", role: "wk", price: 1200 }, { name: "Jadeja", role: "ar", price: 1600 }]
 *   )
 *   // => { teamName: "CSK", totalSpent: 2800, remaining: 6200, playerCount: 2,
 *   //      costliestPlayer: { name: "Jadeja", role: "ar", price: 1600 },
 *   //      cheapestPlayer: { name: "Dhoni", role: "wk", price: 1200 },
 *   //      averagePrice: 1400, byRole: { wk: 1, ar: 1 }, isOverBudget: false }
 *
 *   iplAuctionSummary({ name: "RCB", purse: 500 }, [{ name: "Kohli", role: "bat", price: 1700 }])
 *   // => { ..., remaining: -1200, isOverBudget: true }
 */

function isObject(value){
  return typeof value === 'object' && value !== null && !Array.isArray(value); 
}

export function iplAuctionSummary(team, players) {
  // *   - Agar team object nahi hai ya team.purse positive number nahi hai, return null
  if(!isObject(team) || typeof team.purse !== 'number' || team.purse < 0) return null;

  // *   - Agar players array nahi hai ya empty hai, return null
  if(!Array.isArray(players) || players.length === 0) return null;

  //calculating total spent of player prices & remaining purse
  const totalSpent = players.reduce((acc, player) => acc + player.price, 0);
  const remaining = team.purse - totalSpent;
  const isOverBudget = totalSpent > team.purse;
  const playerCount = players.length;
  const averagePrice = Math.round(totalSpent / playerCount);

  //counting players by role
  const batsmanCount = players.filter(player => player.role === 'bat').length;
  const bowlerCount = players.filter(player => player.role === 'bowl').length;
  const allRounderCount = players.filter(player => player.role === 'ar').length;
  const wicketKeeperCount = players.filter(player => player.role === 'wk').length;
  const byRole = {};
  if(batsmanCount) byRole.bat = batsmanCount;
  if(bowlerCount) byRole.bowl = bowlerCount;
  if(allRounderCount) byRole.ar = allRounderCount;
  if(wicketKeeperCount) byRole.wk = wicketKeeperCount;

  //finding out costliest and cheapest player
  //sorting on the basis of number
  const sortedPlayersByPrice = players.sort((a,b) => a.price - b.price); //ascending order
  const cheapestPlayer = sortedPlayersByPrice.at(0); //first element
  const costliestPlayer = sortedPlayersByPrice.at(-1); //last element

  return {
    teamName: team.name, 
    totalSpent, 
    remaining, 
    playerCount,
    costliestPlayer,
    cheapestPlayer,
    averagePrice, 
    byRole,
    isOverBudget}
}
