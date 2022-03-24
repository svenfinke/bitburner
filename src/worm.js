/** @param {NS} ns **/
export async function main(ns) {
	// infect all available machines and run given scripts.
	let servernames = ns.scan();
	let scriptnames = [
		"compromise.js",
		"worm.js",
		"basic_hack.js",
		"weaken_and_grow.js"
	];
	let hostname = ns.getHostname();
	let visited_servers = ns.args[0] == undefined ? [] : ns.args[0].split('.');
	visited_servers.push(hostname);

	ns.print(visited_servers);
	
	for (let target of servernames) {
		if (visited_servers.includes(target)) continue;
		
		// 1. Infect target machine
		ns.exec("compromise.js", hostname, 1, target);
		while (ns.scriptRunning("compromise.js", target)) {
			await ns.sleep(500);
		}

		// 2. Kill all scripts running on the target server
		ns.killall(target);

		// 3. Copy scripts
		await ns.scp(scriptnames, target);

		// 4. Exec Worm on machine
		ns.exec("worm.js", target, 1, visited_servers.join('.'));
		while (ns.scriptRunning("worm.js", target)) {
			await ns.sleep(500);
		}

		// 5. Run as many hack jobs as possible
		let ramAvailable = ns.getServerMaxRam(target) - ns.getServerUsedRam(target);
		let scriptRam = ns.getScriptRam("weaken_and_grow.js");
		let threadCount = Math.floor(ramAvailable / scriptRam);
		
		if (threadCount >= 1) {
			ns.exec("weaken_and_grow.js", target, threadCount, target);
		}
		await ns.sleep(500);
	}
}