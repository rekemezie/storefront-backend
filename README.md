# Storefront Backend 

In this project we are buildng a backend for Storefront that would be consumed by frontend developers.

Here we architect the database, its tables and columns to fulfill the data requirements of the company and craft a RESTful API that exposes that information to the frontend developer. 

## Required Technologies
The application makes use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Setup

The projects is build with Express, Node/Typescript and TSC Watch. For the server we are working with, Express is already installed with a basic server file provided. Typescript is installed with a .tsconfig file as well as a watcher library called tsc-watch.

We continue with the setup following the instructions below.

*** Note the instructions are based on the Udacity workspace provided for this project ***

In a terminal tab, create and run the database:
- switch to the postgres user: `su postgres`
- start psql: `psql postgres`

in psql run the following:
- `CREATE USER shopping_user WITH PASSWORD 'password123';`
- `CREATE DATABASE shopping;`
- We create a test database as well `CREATE DATABASE shopping_test;`
- `\c shopping`
- `GRANT ALL PRIVILEGES ON DATABASE shopping TO shopping_user;`
- `GRANT ALL PRIVILEGES ON DATABASE shopping_test TO shopping_user;`

to test that it is working run \dt and it should output "No relations found."

## Package installation
In the 2nd terminal, we would install all the dependecies that are required in this project:

- install yarn `npm install yarn -g`
- install db-migrate on the machine for terminal commands `npm install db-migrate -g`
- check node version `node -v` - it needs to be 10 or 12 level
- IF node was not 10 or 12 level, run `npm install -g n`
- Then run `n 10.18.0` 
- later we run `PATH="$PATH"`
- Run `node -v` to check that the version is 10 or 12
- install bcryt for hashing passwords and sensitive data `yarn add bcrypt`
- Install dotenv to enable us send environment variable of our program `yarn add dotenv`
- Install db-migrate-pg to enable postgres db migration, `yarn add db-migrate-pg`
- Install cors to permit sending CORS payload to endpoints `yarn add cors`
- Install json web token library to enable us verity tokens that permit us access some endpoints `yarn add jsonwebtoken`
- Install cross-env package to  switching between environments, `yarn add cross-env`
- install all project dependencies `yarn`
- to test that it is working, run `yarn watch` should show an app starting on 0.0.0.0:3000
- We bring up the database with the command `db-migrate up all`
- We run tests with the command `ENV=test yarn test`

### Envrionment variables setup
This application is build on two environments, `dev` and `test`. The environment variables are found in the `.env` file which consists of :

- POSTGRES_USERNAME - postgres database username
- POSTGRES_PASSWORD - postgres database password
- POSTGRES_DB - postgres database name
- HOST - postgres host address
- PORT - postgres port number
- POSTGRES_TEST_DB - postgres database name for test envrironment
- ENV - environment name
- JWT_KEY - json web token screte key
- TOKEN - default token
- BCRYPT_PASSWORD - bcrypt pepper


### Database migration setup
We setup our project to be able to use db-migrations to create database tables.
- In the project root, we create a configuration file, `database.json`, with the configurations necesssary for db migration
- Create a migraiton for Users table `db-migrate create users --sql-file`, this generates a migration folder in which it as a .js file for users and a folder sql whih contains .sql files for up and down commands for db-migrate.
- For the up files we put in sql query to create users table with fields as spercified in the REQUIREMENTS.md file
- We use down file to drop users table.
- Create migration for Products table `db-migrate create products --sql-file`.
- For the up files we put in sql query to create products table with fields as spercified in the REQUIREMENTS.md file
- We use down file to drop products table.
- Create migration for Orders table `db-migrate  create orders --sql-file`.
- For the up files we put in sql query to create orders table with fields as spercified in the REQUIREMENTS.md file
- We use down file to drop d table.
- Create migration for Product Orders table `db-migrate  create product_orders --sql-file`.
- For the up files we put in sql query to create product_orders table with fields as spercified in the REQUIREMENTS.md file
- We use down file to drop product_orders table.
- With the migrations created in the order as above, we now run `db-migrate up all`, this triggers all the 4 .js files created in the migration folder to run the sql up commands and create tables
- We can now acccess the postgres machine instance terminal connect to shopping database and run `\dt `, this would show all the tables that have been created.

### Models setup
- In the root directory, we open the src directory and create a new folder `models`, inside this models folder we would create different .ts files Users.ts, Products.ts and Orders.ts.
- Under the models folder, we create a test folder to hold all the required models tests.

### Handlers setup.
- Similar to the models setup, we create a handlers directory in the src directory that include handlers files that route the methods of the dfferent models.
- Under the handlers folder, we create a test folder to hold all the required endpoint tests.

## Running Project

With all the files created and setup correctly.

- We kill all running terminals
- Open a new terminal and navigate to the project root.
- Run `yarn` to set all dependencies
- Run `yarn watch`, should show that the project was compiled succesfully and listening on 0.0.0.0:3000
- Open a new terminal and run `curl localhost:3000`, you should get  response of `Hello ` on the teminal to show that it is working.
- We may als start the aplication with the `yarn start` command.

To start up the project locally:-
- make sure you have docker and docker-compose install on you machine.
- navigate to the project root from your terminal and run `docker-compose up` or  `sudo docker-compose up` to install postgres docker  image
- When image is up, run the command `docker-compose run postgres bash` to access the container shell
- follow insructions as in the workspace create a database.

#### Note
make sure you create a test database to run the tests.

## Ports

- The backend server runs on port 3000
- The postgres database runs on port 5432

### Running Users endpoints
The users enpoints require a verified token before it can be accessed this we use the JWT secret to generate a token from `https://jwt.io/#debugger-io`, without any payload.

#### /users/

- To get all users we run `curl -H 'Authorization: Bearer token' -X GET localhost:3000/users` from a terminal 
- We can also run the endpoint on postman include `Authorization: Bearer token` in the Header 

#### /users/:id

- To get user by ID we run `curl -H 'Authorization: Bearer token' -X GET localhost:3000/users/1`

#### /users/

- To create a users we run `curl -d '{"firstname":"somename", "lastname":"somelastname", "password":"somepasword"}' -H 'Authorization: Bearer token' -X POST localhost:3000/users`

#### /users/login/

- To login with an existing users we run `curl -d '{"username":"somename", "password":"somepasword"}' -X POST localhost:3000/users/login/`
- This generates a user token that we can use to access other endpoints

***Note: Replace `token` with the token you generated.***

### Running Products endpoints
Some products enpoints require a verified token before it can be accessed this we use the JWT secret to generate a token from `https://jwt.io/#debugger-io`, without any payload.

#### /products/

- To get all products we run `curl -X GET localhost:3000/products`

#### /products/id/:id

- To get product by ID we run `curl -H 'Authorization: Bearer token' -X GET localhost:3000/products/id/1`

#### /products/category/:category

- To get products by category we run `curl -H 'Authorization: Bearer token' -X GET localhost:3000/products/category/'somecategory'`

***Note: Replace `token` with the token you generated.***

#### /prodcuts/

- To create a product we run `curl -d '{"name":"somename", "price":"2.34", "category":"somecategory"}' -X POST localhost:3000/products`


### Running Orders endpoints
Some orders enpoints require a verified token before it can be accessed this we use the JWT secret to generate a token from `https://jwt.io/#debugger-io`, without any payload.

#### /orders/users/:id

- To get current orders by users ID `curl -H 'Authorization: Bearer token' -X GET localhost:3000/orders/users/1`

#### /orders/users/:id/complete/

- To get completed orders by users ID we run `curl -H 'Authorization: Bearer token' -X GET localhost:3000/orders/users/1/complete/`

***Note: Replace `token` with the token you generated.***

### Testing 

- Run jasmine tests with the command  `yarn test`
- All tests should passes

#### Note

I made some modifications on the jasmine.json file and also on the package.json file to enable the project run smoothly.

- On the `jasmine.json` file I set the value of `random` to `false` so that all tests can run in order and not randomly.
- I also modified line 9 of my package.json file `"test": "db-migrate --env test up all && cross-env ENV=test jasmine-ts --config=spec/support/jasmine.json && db-migrate db:drop test",`. This will enable me populate a test database and drop all its tables at the end of the tests.
- In our environment we used the variable JWT_KEY for the JWT secrete we have a default token `TOKEN` that we use to to create an inintal user.