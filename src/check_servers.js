/** @param {NS} ns **/
export async function main(ns) {
	// Find server with most effective hacking
	let servers = ns.scan();
	for (let server of servers) {
		let stealPercentage = ns.hackAnalyze(server);
		let maximumMoney = ns.getServerMaxMoney(server);
		let chance = ns.hackAnalyzeChance(server);
		let hackTimeMs = ns.getHackTime(server);

		// Calc money per second
		let moneyPerSecond = (maximumMoney * stealPercentage) / (hackTimeMs / 1000);
		ns.print(`Server ${server} will generate ${moneyPerSecond} / s with a chance of ${chance}`);
	}
}