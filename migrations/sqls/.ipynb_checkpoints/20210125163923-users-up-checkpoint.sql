/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50),
    password TEXT NOT NULL
);