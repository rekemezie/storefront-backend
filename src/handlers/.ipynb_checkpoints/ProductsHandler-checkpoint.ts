import express, { Request, Response } from "express";
import { Products } from '../models/Products';


const authenticateToken = require('../../jwt_auth/auth');

const index = async (req: Request, res: Response) => { 
    const products = new Products();
    try {
        const results = await products.index();
        res.status(200).json(results);
    } catch (e) {
        return res.status(401).send('Unable to find products')
    }    
};

const show =  async (req: Request, res: Response) => {
    var products = new Products();
    try {
        const results = await products.getProductById(Number(req.params.id));
        res.status(200).json(results);
    } catch (e) {
        return res.status(401).send('Unable to get results')
    }     
};

const productsByCategory = async (req: Request, res: Response) => {
    const products = new Products();
    try {
        
        res.status(200).json(await products.getProductsByCategory(req.params.category));
        //console.log(req.params.category)
    } catch (e) {
        return res.status(401).send('Unable to find user')
    }     
};

const create =  async (req: Request, res: Response) => {
   try {
        const pname = JSON.parse(JSON.stringify(req.body.name));
        const pprice = req.body.price;
       
        const pcategory = JSON.parse(JSON.stringify(req.body.category));
        const products = new Products();

        const newProduct = {name: pname, price: Number(pprice), category: pcategory}
    
        await products.createProduct(newProduct);
        res.status(200).send('Product created');
    } catch(err){
        return res.status(401).send('Unable to create product, check input data and header')
    }
};

const productRouter = (app: express.Application) => {
    app.get('/products/', index)
    app.get('/products/id/:id', show)
    app.get('/products/category/:category', productsByCategory)
    app.post('/products/', authenticateToken, create)
};

export default productRouter