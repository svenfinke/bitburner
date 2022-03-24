/** @param {NS} ns **/
export async function main(ns) {
	// Upgrade hacknet nodes.
	let targetRam = 64;
	let targetLevel = 150;
	let targetNodeCount = 8;
	let targetCores = 10;

	let allDone = true;

	while(true){
		let allDone = true;

		let ownedNodes = ns.hacknet.numNodes();

		for (let i = 0; i < ownedNodes; i++) {
			if (ns.hacknet.getNodeStats(i).level < targetLevel) {
				allDone = false;
				if (ns.hacknet.getLevelUpgradeCost(i) < ns.getServerMoneyAvailable("home")) {
					ns.hacknet.upgradeLevel(i);
				}
			} else if (ns.hacknet.getNodeStats(i).ram < targetRam) {
				allDone = false;
				if (ns.hacknet.getRamUpgradeCost(i) < ns.getServerMoneyAvailable("home")) {
					ns.hacknet.upgradeRam(i);
				}
			} else if (ns.hacknet.getNodeStats(i).cores < targetCores) {
				allDone = false;
				if (ns.hacknet.getCoreUpgradeCost(i) < ns.getServerMoneyAvailable("home")) {
					ns.hacknet.upgradeCore(i);
				}
			}
		}
		
		if (ns.hacknet.numNodes < targetNodeCount) {
			allDone = false;
			if (ns.hacknet.getPurchaseNodeCost() < ns.getServerMoneyAvailable("home")) {
				ns.hacknet.purchaseNode();
			}
		}
		
		if (allDone) break;
		await ns.sleep(1000);
	}
}