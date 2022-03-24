/** @param {NS} ns **/
export async function main(ns) {
	let target = ns.args[0];
	let portsOpened = 0;

	switch(ns.getServerNumPortsRequired(target)) {
		case 5: if (ns.fileExists("SQLinject.exe", "home")) {
			ns.sqlinject(target);
			portsOpened++;
		}
		case 4: if (ns.fileExists("HTTPworm.exe", "home")) {
			ns.httpworm(target);
			portsOpened++;
		}
		case 3: if (ns.fileExists("relaySMTP.exe", "home")) {
			ns.relaysmtp(target);
			portsOpened++;
		}
		case 2: if (ns.fileExists("FTPcrack.exe", "home")) {
			ns.ftpcrack(target);
			portsOpened++;
		}
		case 1: if (ns.fileExists("bruteSSH.exe", "home")) {
			ns.brutessh(target);
			portsOpened++;
		}
		case 0: {
			if (ns.getServerNumPortsRequired(target) <= portsOpened) {
				ns.nuke(target);
				await ns.sleep(1000);
			}
		}
	}
}