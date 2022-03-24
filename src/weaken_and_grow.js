/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0];
	if (target == undefined) throw new Error("You must pass a target.");
	let reduceSecurity = false;

	while(true){
		let securityLevel = ns.getServerSecurityLevel(target);
		let minimalSecurityLevel = ns.getServerMinSecurityLevel(target);
		let securityThreshold = minimalSecurityLevel * 2;
		if (securityLevel >= securityThreshold) reduceSecurity = true;

		let moneyAvailable = ns.getServerMoneyAvailable(target);
		let maxMoneyAvailable = ns.getServerMaxMoney(target);

		if (reduceSecurity) {
			ns.print(`> SecLvl too high (${securityLevel})`);
			ns.print(`-> Running weaken on target ${target}.`);
			await ns.weaken(target);
		} else {
			ns.print(`> Money too low (${moneyAvailable})`);
			ns.print(`-> Running grow on target ${target}.`);
			await ns.grow(target);
		}

		moneyAvailable = ns.getServerMoneyAvailable(target);
		maxMoneyAvailable = ns.getServerMaxMoney(target);
		if (moneyAvailable == maxMoneyAvailable) {
			return;
		}

		securityLevel = ns.getServerSecurityLevel(target);
		minimalSecurityLevel = ns.getServerMinSecurityLevel(target);
		if (securityLevel == minimalSecurityLevel) {
			reduceSecurity = false;
		}
	}
}