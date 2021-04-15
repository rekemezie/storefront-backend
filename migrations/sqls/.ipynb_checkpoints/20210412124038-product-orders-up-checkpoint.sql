CREATE TABLE IF NOT EXISTS "product_orders" (
    id SERIAL PRIMARY KEY,
    quantity INTEGER,
    order_id bigint REFERENCES orders(id), 
    product_id bigint REFERENCES products(id)
);