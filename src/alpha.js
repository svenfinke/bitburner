/** @param {NS} ns **/
export async function main(ns) {
	if (ns.getPurchasedServerCost(1048576) > ns.getServerMoneyAvailable("home")){
		throw new Error('Not enough money to purchase a server.');
	}
	ns.purchaseServer('privsrv', 1048576);
}