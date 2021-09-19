const config = require("../config.json");
const request = require('request');
const fs = require('fs');

module.exports = {
	getHashrate: function(xmraddr, callback) {
		request('https://'+config.API_DOMAIN+'/miner/'+xmraddr+'/stats/allWorkers', { json: true }, (err, res, body) => {
			if (err) { return console.log(err); }
			
			callback(body.global.hash);

		});
	}
}
