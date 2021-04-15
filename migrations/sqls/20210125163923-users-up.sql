CREATE TABLE IF NOT EXISTS "users" (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50),
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);