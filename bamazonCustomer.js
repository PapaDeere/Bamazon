var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3333,

  // Your username
  user: "root",

  // Your password
  password: "Snafu5!50",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runProducts( {
	inquirer
	.prompt({
		name: "action",
		type: "list",
		message: "What would you like to buy?"
		choices: [ ]
	})
})