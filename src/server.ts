import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
const cors = require('cors');

import productRouter  from './handlers/ProductsHandler'
import orderRouter from './handlers/OrdersHandler'
import userRouter from './handlers/UsersHandler';

const app: express.Application = express()
const address: string = "0.0.0.0:3000"

app.use(bodyParser.json())
app.use(cors())

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})

userRouter(app)
productRouter(app)
orderRouter(app)

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})

module.exports = app
