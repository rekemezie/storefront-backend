# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index : /products [GET]
- Show (args: product id): route: '/products/id/:id' [GET]
- Create (args: Product)[token required] : route: '/products' [POST]
- [OPTIONAL] Top 5 most popular products : route:'/products/top/:value' [GET]
- [OPTIONAL] Products by category (args: product category) : route:'/products/category/:categrory' [GET]

#### Users
- Index [token required]: route: '/users' [GET]
- Show (args: id)[token required] : route: '/users/:id' [GET]
- Create (args: User)[token required] : route:'/users/:user' [POST]
- Login (args: User) : route:'/users/login/ [POST]

#### Orders
- Current Order by user (args: user id)[token required] : route:'/orders/users/:id' [GET]
- [OPTIONAL] Completed Orders by user (args: user id)[token required] : route: '/orders/users/:id/complete/' [GET]
- Add Product to an Order (args: quantity, order id, product id)[token required]: route: '/orders/:id/product/' [POST]

## Data Shapes
#### Products
-  id : SERIAL [primary key]
- name : VARCHAR(50)
- price : NUMERIC
- [OPTIONAL] category : VARCHAR(50)

#### Users
- id : SERIAL [primary key]
- firstName : VARCHAR(50) NOT NULL
- lastName : VARCHAR(50)
- username : VARCHAR(50) UNIQUE NOT NULL
- password : TEXT NOT NULL

#### Orders
- id : SERIAL [primary key]
- user_id : BIGINT [foreign key to Users table]
- status of order (active or complete) - status : VARCHAR(8)

#### Ordered_Products
- id : SERIAL [primary key]
- quantity of each product in the order -  quantity: INTEGER
- order_id: BIGINT [foreign key to Orders table]
- id of each product in the order - product_id: BIGINT [foreign key to Products table]
