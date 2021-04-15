CREATE TABLE IF NOT EXISTS "orders" (
    id SERIAL PRIMARY KEY,
    status VARCHAR(8),
    user_id bigint REFERENCES users(id)  
);