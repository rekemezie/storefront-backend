import express, { Request, Response } from "express";
import { Users, IUser } from '../models/Users';
import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');
import authenticateToken from '../../jwt_auth/auth';

dotenv.config()

const users = new Users();

const index = async (req: Request, res: Response) => { 
    
    try {
        const results = await users.index();
        res.status(200).json(results);
    } catch (e) {
        return res.status(401).send('Unable to find users')
    }
    
    
};

const show =  async (req: Request, res: Response) => {
    
    try {
        res.status(200).json(await users.getUsersById(Number(req.params.id)));
    } catch (e) {
        return res.status(401).send('Unable to find user')
    }     
};

const create = async (req: Request, res: Response) => {
    
    const firstName = req.body.firstname;
    const lastName = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;
    
    
    const newUser = {firstname: firstName, lastname: lastName, username: username, password: password};
   
    try{
        await users.createUser(newUser);
        const token = jwt.sign({user: newUser.username}, process.env.JWT_KEY);
        res.status(200).json(token);
    } catch(err){
        return res.status(401).send(`Unable to create user. Error ${err}`)
    }
};

const authenticate = async (req: Request, res: Response) => { 
    const username = JSON.parse(JSON.stringify(req.body.username));
    const password = JSON.parse(JSON.stringify(req.body.password));
    
    try {
        const u = await users.authenticate(username, password)
        if (u !== null){
            const token = jwt.sign({ user: u }, process.env.JWT_KEY);
            res.json(token);
        }
        
    } catch(error) {
        return res.status(401).json({ error });
    }
  }

const userRouter = (app: express.Application) => {
    app.get('/users/', authenticateToken, index)
    app.get('/users/:id', authenticateToken, show)
    app.post('/users/', authenticateToken, create)
    app.post('/users/login/', authenticate)
};


export default userRouter