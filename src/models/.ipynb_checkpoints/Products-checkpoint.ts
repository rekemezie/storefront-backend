import db from '../db_connect';

export type IProduct = {
    id?: Number
    name: String
    price: Number
    category: String
}

export class Products {
       
    constructor (){
        this.index = this.index.bind(this);
        this.getProductById= this.getProductById.bind(this);
       this.getProductsByCategory = this.getProductsByCategory.bind(this);
        this.createProduct = this.createProduct.bind(this);
    }
    
   async index(): Promise<Array<IProduct>>
     {
        const conn = await db.connect();
        const query = 'SELECT * FROM products';
        try {
            const result = await conn.query(query);
            conn.release()
            return result.rows;
        } catch(err) {
            console.log(err);
            throw new Error(`Could not get all Products. Error: ${err}`);
        }
    }
    
    async getProductById(id: Number): Promise<IProduct> {
        const conn = await db.connect();
        const query = `SELECT * FROM products WHERE id=${id}`;
        try {
            const result = await conn.query(query);
            conn.release();
            return result.rows[0];
        } catch(err) {
            console.log(err);
            throw new Error(`Products ID ${id} not found. Error: ${err}`);
        }
    }
    
    
    async getProductsByCategory(category: String): Promise<Array<IProduct>> {
        const conn = await db.connect();
        const query = `SELECT * FROM products WHERE category='${category}'`;
        try {
            const result = await conn.query(query);
            conn.release();
            return result.rows;
        } catch(err) {
            console.log(err);
            throw new Error(`Products category ${category} not found. Error: ${err}`);
        }
    }
    
    async getMostPopularProducts(quantity: Number): Promise<IProduct[]> {
        const conn = await db.connect();
        const query = `SELECT * FROM products LIMIT ${quantity}`;
        try {
            const result = await db.query(query);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`${quantity} most popular products not found. Error: ${err}`);
        }
    }
    
    async createProduct(p: IProduct): Promise<void>{
        const conn = await db.connect();        
        const query = 'INSERT INTO products (name, price, category) VALUES ($1, $2, $3)  RETURNING *';
        try {
            await conn.query(query, [p.name, p.price, p.category]);
            conn.release()
        } catch(err) {
            //console.log(err);
            throw new Error(` Can not create Product: ${p.name}. Error: ${err}`);
        }
    }
    
    
}