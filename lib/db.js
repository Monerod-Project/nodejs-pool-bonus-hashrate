const config = require("../config.json");
const mysql = require('mysql');
const pool  = mysql.createPool(config.DB.connection);

module.exports = {
	getAddresses: function(callback) {

		pool.query('SELECT username FROM users', function (error, results, fields) {
			if ((error) || (results.length < 1)) {
				callback(true);
				return;
			}
			
			addresses = [];
			for(result of results) {
				addresses.push(result.username);
			}

			callback(false, addresses);
		});
		
	},
	close : function() {
		pool.end();
	}
}
