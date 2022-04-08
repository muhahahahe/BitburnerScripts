/** @param {NS} ns */
function print_host(ns, prefix, host) {
	let label = prefix + "  \\-- " + host;

	let flags = ns.flags([
		['o', false],
		['organization', false],
		['m', false],
		['money', false]
	]);

	let show_organization = flags['o'] || flags['organization'];
	let show_money = flags['m'] || flags['money'];
	let server = ns.getServer(host);

	if (show_organization || show_money) {
		label += " (";
	}

	if (show_organization) {
		label += server.organizationName;
	}

	if (show_organization && show_money) {
		label += " - ";
	}

	if (show_money) {
		label += ns.nFormat(server.moneyAvailable, '($0.000a)');
	}

	if (show_organization || show_money) {
		label += ")";
	}

	ns.tprint(label);
}

/** @param {NS} ns */
function walk(ns, host, prefix="") {
	let servers = ns.scan(host);
	servers.shift();
	for (let [index, next] of servers.entries()) {
		print_host(ns, prefix, next);
		let next_prefix = prefix + (index < servers.length - 1 ? "  |  " : "     ")
		walk(ns, next, next_prefix);
	}
}

/** @param {NS} ns */
export async function main(ns) {
	let host = "home";
	if (ns.args.length > 0) {
		host = ns.args[0];
	}
	ns.tprint(host);
	walk(ns, host);
}
