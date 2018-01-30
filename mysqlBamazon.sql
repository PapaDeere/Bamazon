USE bamazon;
CREATE TABLE products(
item_id INTEGER(11)auto_increment NOT NULL,
product_name VARCHAR(50)NOT NULL,
department_name VARCHAR(11)NOT NULL,
price INTEGER(11)NOT NULL,
stock_quantity INTEGER(11)NOT NULL,
PRIMARY KEY (item_id)
);
