/** @param {NS} ns **/
export async function main(ns) {
	let servername = 'privsrv';

	let files = [
		'advanced_hacking.js',
		'basic_hack.js',
		'batch_script.js',
		'compromise.js',
		'rush.js',
		'weaken_and_grow.js',
		'worm.js'
	];

	while (ns.getPurchasedServerCost(1048576) <= ns.getServerMoneyAvailable("home")){
		ns.purchaseServer(servername, 1048576);
	}

	let servernames = ns.scan();
	for (let target of servernames) {
		if (target.startsWith(servername)) {
			await ns.scp(files, target);
		}
	}
}