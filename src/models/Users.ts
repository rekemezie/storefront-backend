import db from '../db_connect';
import dotenv from 'dotenv';
const bcrypt = require('bcrypt');

dotenv.config()

const saltRounds = Number(process.env.SALT_ROUNDS);
const pepper = String(process.env.BCRYPT_PASSWORD);

export type IUser = {
    id?: Number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
}

export class Users {
    constructor (){
        this.index = this.index.bind(this);
        this.getUsersById = this.getUsersById.bind(this);
        this.createUser = this.createUser.bind(this);
        this.authenticate = this.authenticate.bind(this);
    }
    
    async index (): Promise<IUser[]> {
        const conn =  await db.connect();
        const sql = 'SELECT * FROM Users';
        try {
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        } catch(err) {
            throw new Error(`Could not get all Users. Error: ${err}`);
        }
        
    }
    
    async getUsersById (id: Number): Promise<IUser> {
        const conn =  await db.connect();
        const query = 'SELECT * FROM users WHERE id=($1)';
        try {
            const result = await conn.query(query, [id]);
            conn.release();
            return result.rows[0];
        } catch(err) {
            throw new Error(`Could not get User with id: ${id}. Error: ${err}`);
        }
        
    }
    
    async createUser (u: IUser): Promise<void> {
        const conn =  await db.connect();
        const hash: String = await bcrypt.hashSync(u.password+pepper, saltRounds);
        
        const query = 'INSERT INTO users (firstname, lastname, username, password) VALUES ($1, $2, $3, $4) RETURNING *';
        try {
            await conn.query(query, [u.firstname, u.lastname, u.username, hash]);
            conn.release();
        } catch(err) {
            throw new Error(`Could not create User ${u.username}. Error: ${err}`);
        }
        
    }

    async authenticate (u: string, p: string): Promise<string | null> {
        const conn =  await db.connect();
                
        const query = 'SELECT password FROM users WHERE username = ($1)';
        try {
            const results = await conn.query(query, [u]);
            conn.release();
            if (results.rows.length){
                const password_digest = results.rows[0].password;

                if(bcrypt.compareSync( p+pepper, password_digest)){
                    return u;
                }
            }     
            return null;
        } catch(err) {
            throw new Error(`Could not authenticate User ${u}. Error: ${err}`);
        }
        
    }
        
}
