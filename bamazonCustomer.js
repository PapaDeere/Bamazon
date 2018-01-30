var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});


connection.connect(function(err) {
  if (err) throw err;
  runSearch();
});

function runProducts(){
  //The first should ask them the ID of the product they would like to buy.
  inquirer.prompt({
    name: "item_id",
    type: "input",
    message: "Please give us the ID of the product you would like to buy?"
  }).then(function(answer){
    console.log(answer.item_id, "this is the id they would like to buy")
    inquirer.prompt({
      name: "howMany",
      type: "input",
      message: "Please give us the quantity of the product they would like to buy?"
    }).then(function (quantity) {
      //The second message should ask how many units of the product they would like to buy.

      console.log(quantity.howMany, "this is the quantity they want to purchase")
      // Once the customer has placed the order, your application should check
      // if your store has enough of the product to meet the customer 's request.
      //probably going to need to query our database again to check the quantity
      //to provide our database with the id of the product they want to buy and possibly the quantity
      //lets save the price and all order info that we could need
      getProduct(answer.item_id, quantity.howMany)

    })

  })

}

function runSearch(){
  connection.query('SELECT * FROM products', function (error, results, fields) {
    if (error) throw error;
    for(var i = 0; i< results.length; i++){
      console.log("===========================");
      console.log("ID: " + results[i].item_id + " Product Name: " + results[i].product_name + " Price: " + results[i].price);
    }
     runProducts();
  });
  // connection.end();
}

function getProduct(item_id, howMany) {

  console.log(item_id, "this was out passesd in item_id");
  console.log(howMany, "this was out passesd in how many");
  connection.query('SELECT * FROM products WHERE item_id =' + item_id, function (error, results, fields) {
    if (error) throw error;
    // console.log(results[0])
    var chosenProduct = results[0];
         // check to see if your store has enough of the product to meet the customer 's request.
          // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
            //if stock_quantity > howMany we are good to have that user buy stuff
            //else console.log(Insufficient quantity!) and connection.end()
    if (chosenProduct.stock_quantity >= howMany){
      // However,
      // if your store does have enough of the product, you should fulfill the customer 's order.

      // This means updating the SQL database to reflect the remaining quantity.
      // Once the update goes through, show the customer the total cost of their purchase.

      //make a query to update the product quanity
      var newQuantity = parseInt(chosenProduct.stock_quantity) - parseInt(howMany)
      // console.log(newQuantity)
      connection.query('UPDATE products SET stock_quantity = ' + newQuantity + ' WHERE item_id = ' + parseInt(item_id),
          function (error, results, fields) {

            if (error) throw error;

            // console.log(results) 
            connection.query('SELECT * FROM products WHERE item_id =' + item_id, function (error, results, fields) {
                  if (error) throw error;
                  // console.log(results[0])
                  var invoice = results[0].price * parseInt(howMany)
                  console.log("your order total is $" + invoice)
                  connection.end()
            })
          
          })

    }else{
      console.log("Insufficient quantity!");
       connection.end()
    }

  });
  //connection.end();
}
