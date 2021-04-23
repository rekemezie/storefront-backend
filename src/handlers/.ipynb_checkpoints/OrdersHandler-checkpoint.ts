import express, { Request, Response } from "express";
import { Orders } from '../models/Orders';

const authenticateToken = require('../../jwt_auth/auth');

const orders = new Orders();

const currentOrder =  async (req: Request, res: Response) => {
    try {
        const results = await orders.getOrdersByUsers(Number(req.params.id));
        res.status(200).json(results);
    } catch {
        return res.status(401).send('Failed to fetch orders');
    }
};

const complete =  async (req: Request, res: Response) => {
    try {
        const results = await orders.getCompletedOrdersByUser(Number(req.params.id));
        res.status(200).json(results);
    } catch {
        return res.status(401).send('Failed to fetch orders');
    }
};

const addProduct = async (req: Request, res: Response) => {
    try {
        const quantity = Number(req.body.quantity);
        const order_id = Number(req.params.id);
        const product_id = Number(req.body.product_id);
        const results = await orders.addProduct(quantity, order_id, product_id);
        res.status(200).json(results);
    } catch {
        return res.status(401).send('Failed to add product to order.');
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.body.user_id);
        const status = req.body.status;
        const results = await orders.createOrder({user_id, status});
        res.status(200).json(results);
    } catch {
        return res.status(401).send('Failed to create new order.');
    }
}

const orderRouter = (app: express.Application) => {
    app.get('/orders/users/:id', authenticateToken, currentOrder)
    app.get('/orders/users/:id/complete', authenticateToken, complete)
    app.post('/orders/', authenticateToken, create)
    app.post('/orders/:id/product/', authenticateToken, addProduct)
}


export default orderRouter