/** @param {NS} ns **/
export async function main(ns) {
	/** Run given script on all found servers */
	let servernames = ns.scan();
	let scriptname = ns.args[0];
	let hostname = ns.args[1] == undefined ? ns.getHostname() : ns.args[1];

	if (scriptname == undefined) throw new Error("Scriptname is not defined");

	for (let server of servernames) {
		ns.exec(scriptname, hostname, 1, server);
	}
}