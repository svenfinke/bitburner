/** @param {NS} ns **/
export async function main(ns) {
	// Run a basic hacking script thingy
	let target = ns.args[0];
	if (target == undefined) throw new Error("You must pass a target.");
	
	while(true){
		let securityLevel = ns.getServerSecurityLevel(target);
		let minimalSecurityLevel = ns.getServerMinSecurityLevel(target);
		let securityThreshold = minimalSecurityLevel * 3;

		let moneyAvailable = ns.getServerMoneyAvailable(target);
		let maxMoneyAvailable = ns.getServerMaxMoney(target);
		let moneyThreshold = maxMoneyAvailable * 0.01;

		if (ns.getServerRequiredHackingLevel(target) > ns.getHackingLevel()) {
			securityThreshold = minimalSecurityLevel * 2; // Lower the threshold for security
			moneyAvailable = 0; // Always Grow if security is already low enough.
		}

		if (securityLevel > securityThreshold) {
			ns.print(`> SecLvl too high (${securityLevel})`);
			ns.print(`-> Running weaken on target ${target}.`);
			await ns.weaken(target);
		} else if (moneyAvailable < moneyThreshold ) {
			ns.print(`> Money too low (${moneyAvailable})`);
			ns.print(`-> Running grow on target ${target}.`);
			await ns.grow(target);
		} else {
			ns.print(`-> Running hack on target ${target}.`);
			await ns.hack(target);
		}
	}
}