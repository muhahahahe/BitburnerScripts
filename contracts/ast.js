/** @param {NS} ns */
export async function main(ns) {
    let input = JSON.parse(ns.args[0]);
    let responsePort = ns.args[1];
    ns.print(input);

    let maxTransactions = input[0];
    let prices = input[1];

    if (prices.length < 2) {
        ns.print(`Not enough prices to transact. Maximum profit is 0.`);
        ns.writePort(responsePort, 0);
        return;
    }

    if (maxTransactions > prices.length / 2) { // Is this valid if the input array hasn't been optimized?
        let sum = 0;
        for (let day = 1; day < prices.length; day++) {
            sum += Math.max(prices[day] - prices[day - 1], 0);
        }
        ns.print(`More transactions available than can be used. Maximum profit is ${sum}.`);
        ns.writePort(responsePort, sum);
        return;
    }

    let rele = new Array(maxTransactions + 1).fill(0);
    let hold = new Array(maxTransactions + 1).fill(Number.MIN_SAFE_INTEGER);

    for (let day = 0; day < prices.length; day++) {
        let price = prices[day];
        for (let i = maxTransactions; i > 0; i--) {
            rele[i] = Math.max(rele[i], hold[i] + price);
            hold[i] = Math.max(hold[i], rele[i - 1] - price);
        }
    }

    let profit = rele[maxTransactions];
    ns.print(`Maximum profit is ${profit}`);
    ns.writePort(responsePort, profit);
}
