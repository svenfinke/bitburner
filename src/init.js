const baseUrl = 'https://raw.githubusercontent.com/svenfinke/bitburner/main/src/'
const filesToDownload = [
  'batch_script.js',
  'compromise.js',
]

/** @param {NS} ns **/
export async function main(ns) {
  let hostname = ns.getHostname()

  if (hostname !== 'home') {
    throw new Exception('Run the script from home')
  }

  for (let i = 0; i < filesToDownload.length; i++) {
    const filename = filesToDownload[i]
    const path = baseUrl + filename
    await ns.scriptKill(filename, 'home')
    await ns.rm(filename)
    await ns.sleep(200)
    ns.tprint(`[${localeHHMMSS()}] Trying to download ${path}`)
    await ns.wget(path + '?ts=' + new Date().getTime(), filename)
  }
}