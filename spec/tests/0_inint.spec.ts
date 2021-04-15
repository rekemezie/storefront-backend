import db from '../../src/db_connect';
const timeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

beforeAll(async function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 999999;
    });
    
    afterAll(async function(){
        jasmine.DEFAULT_TIMEOUT_INTERVAL = timeout;
        const conn = await db.connect();
        await conn.query("DROP TABLE IF EXISTS  product_orders");
        await conn.query("DROP TABLE IF EXISTS  orders;");
        await conn.query("DROP TABLE IF EXISTS  products;");
        await conn.query("DROP TABLE IF EXISTS users;");
        await conn.query("DROP TABLE IF EXISTS  migrations;");
    });