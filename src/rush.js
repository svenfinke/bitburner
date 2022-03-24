/** @param {NS} ns **/
export async function main(ns) {
	/** Run given script on all found servers */
	let scriptname = "advanced_hacking.js";
	let target = ns.args[0];
	let server = ns.getHostname();

	if (target == undefined) throw new Error("Target is not defined");

	// Calc max threads
	let ramAvailable = ns.getServerMaxRam(server);
	let scriptRam = ns.getScriptRam(scriptname);
	let threadCount = Math.floor(ramAvailable / scriptRam);

	if (threadCount >= 1) {
		ns.spawn(scriptname, threadCount, target);
	}
}