/** @param {NS} ns **/
export async function main(ns) {
	/** Run given script on all found servers */
	let servernames = ns.scan();
	let scriptname = ns.args[0];
	let killall = ns.args[1] == "killall";

	if (scriptname == undefined) throw new Error("Scriptname is not defined");

	for (let server of servernames) {
		let hostname = ns.args[2] == undefined ? server : ns.args[1];

		if (killall) {
			ns.killall(server);
		}

		// Calc max threads
		let ramAvailable = ns.getServerMaxRam(server) - ns.getServerUsedRam(server);
		let scriptRam = ns.getScriptRam(scriptname);
		let threadCount = Math.floor(ramAvailable / scriptRam);

		if (threadCount >= 1) {
			await ns.scp(scriptname, server);
			ns.exec(scriptname, hostname, threadCount, server);
			while (ns.scriptRunning(scriptname, server)) {
				await ns.sleep(500);
			}
		}
	}
}