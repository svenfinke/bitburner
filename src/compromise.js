/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0];
	let portsOpened = 0;
	let programs = [
		"BruteSSH.exe",
		"FTPCrack.exe",
        "relaySMTP.exe",
        "SQLInject.exe",
        "HTTPWorm.exe"
	];

	for (let program of programs) {
		if (ns.fileExists(program)) {
			ns.exec(program, target);
			portsOpened++;
		}
	}

	if (ns.getServerNumPortsRequired(target) <= portsOpened) {
		ns.nuke(target);
	}
}