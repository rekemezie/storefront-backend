import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    PORT,
    POSTGRES_USERNAME,
    POSTGRES_PASSWORD,
    ENV,
} = process.env 

let db
console.log(ENV)

if (ENV === 'test'){
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_TEST_DB,
        port: Number(PORT),
        user: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
    })
}

if (ENV === 'dev'){
    db = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        port: Number(PORT),
        user: POSTGRES_USERNAME,
        password: POSTGRES_PASSWORD,
    })
}

export default db