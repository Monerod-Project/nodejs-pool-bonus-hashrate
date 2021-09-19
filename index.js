const config = require("./config.json");
const fs = require('fs');
const db = require('./lib/db.js');
const api = require('./lib/api.js');

var addresses = [];

// Loop through addresses, check if hashing, and write to xmrig config
function loop(key) {
	
	api.getHashrate(addresses[key], function(hashrate) {
		if (hashrate > 0) {
			xmrigConfig = require(config.XMRIG_CONFIG);
			xmrigConfig.pools[0].user = addresses[key];
			fs.writeFileSync(config.XMRIG_CONFIG, JSON.stringify(xmrigConfig, null, '\t'));
			
			// Check if end of array. If not go to next one, if so refresh address from DB
			if (key + 1 < addresses.length) {
				setTimeout(loop, 1800000,key+1);
			} else {
				setTimeout(main, 1800000);
			}
		} else {
			if (key + 1 < addresses.length) {
				loop(key + 1);
			} else {
				main();
			}
		}
	});
}

// Get array of addresses from the database
function main() {
	db.getAddresses(function(error, result) {
		if (error) {
			console.log(error);
			throw 'Unable to get addresses';
		} else {
			addresses = result;
			// Start looping through addresses
			loop(0);
		}
	});
}

main();