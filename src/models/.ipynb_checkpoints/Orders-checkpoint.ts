import db from '../db_connect';

export type IOrders = {
    id?: Number
    user_id: Number
    status: String
}

export class Orders{    
    constructor (){
        this.getOrdersByUsers = this.getOrdersByUsers.bind(this);
        this.getCompletedOrdersByUser = this.getCompletedOrdersByUser.bind(this);
        this.createOrder = this.createOrder.bind(this);
        this.addProduct = this.addProduct.bind(this);
    }
    
    async getOrdersByUsers(id: Number): Promise<IOrders[]> {
        const conn = await db.connect();
        const query = 'SELECT * FROM orders WHERE user_id=$1';
        
        try {
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`Could not get all order. Error: ${err}`);
        }
    }
    
    async getCompletedOrdersByUser(id: Number): Promise<IOrders[]> {
        
        const conn = await db.connect();
        const query = 'SELECT * FROM orders INNER JOIN product_orders ON orders.id = product_orders.order_id WHERE orders.user_id=$1 AND orders.status=$2';
        
        try {
            const result = await conn.query(query, [id, 'complete']);
            conn.release();
            return result.rows;
        } catch(err) {
            
            throw new Error(`Could not get all order. Error: ${err}`);
        }
    }
    
    async createOrder(o: IOrders): Promise<void> {
        const conn = await db.connect();
        const query = 'INSERT INTO orders (user_id, status) VALUES ($1, $2)';
        
        try {
            await conn.query(query, [ o.user_id, o.status]);
            conn.release();
        } catch(err) {
            
            throw new Error(`Could not create order. Error: ${err}`);
        }
    }
    
    async addProduct(quantity: Number, order_id: Number, product_id: Number ): Promise<IOrders> {
        const conn = await db.connect();
        const query = 'INSERT INTO product_orders (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
        
        try {
            const results = await conn.query(query, [ quantity, order_id, product_id]);
            conn.release();
            return results.rows[0]
            
        } catch(err) {
            
            throw new Error(`Could not add ordered product. Error: ${err}`);
        }
    }
    
}