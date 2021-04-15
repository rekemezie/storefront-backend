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

const orderRouter = (app: express.Application) => {
    app.get('/orders/users/:id', authenticateToken, currentOrder)
    app.get('/orders/users/:id/complete', authenticateToken, complete)
}


export default orderRouter