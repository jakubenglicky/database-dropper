const core = require('@actions/core');
const mysql = require('mysql');

const connectionOptions = {
	host : core.getInput('database_host') ? core.getInput('database_host') : 'localhost',
	user : core.getInput('database_user') ? core.getInput('database_user') : 'root',
	password : core.getInput('database_password') ? core.getInput('database_password') : 'root',
}

const database = core.getInput('database_name') ? core.getInput('database_name') : 'example_db';

let connection = mysql.createConnection(connectionOptions);

connection.connect(function(err) {
	if ( ! err) {
		console.log('Connected to ' + connectionOptions.user + '@' + connectionOptions.host + ' successfully.');
	}
});

connection.query('DROP DATABASE ' + database, function (error, results, fields) {
	if (error) {
		console.log(error.message);
	} else {
		console.log('Database ' + database + ' was deleted.');
	}
});

connection.end();
