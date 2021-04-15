import { Request, Response } from "express";
const request = require('request');
import { Users, IUser } from '../../src/models/Users';
const app = require('../../src/server');
const dotenv = require('dotenv');

dotenv.config();

const testUser: IUser = {firstname: 'test', lastname: 'user', username: 'admin', password:'password'};

const endpoint = 'http://localhost:3000/products';

describe(`4: Get all Products Endpoint: ${endpoint}`, function () {
    
    it("test 1: gets all products.", function (done) {
        request.get(endpoint, async (req: Request, res: Response) => {
            const status = await res.statusCode;
            expect(status).toEqual(200);
        });
        done();
    });
    
});

describe(`5: Get Product by ID Endpoint: ${endpoint}/id/1`, function () {
    it("test 1: get product by ID.", function (done) {
        request.get(`${endpoint}/id/1`, async (req: Request, res: Response) => {
            const status = await res.statusCode;
            expect(status).toEqual(200);
        });
        done();
    });    
});

describe(`6: Create Products Endpoint: ${endpoint}`, function () {
    it("test 1: fails to create product with header token missings.", function (done) {
        const options = {
            method: 'POST',
            url: endpoint,
            headers: {
                'Content-Type': 'application/json'
            },
            body: {pname: 'asmin', price: 'adsae', password:'pawefwer'},
            json: true
        }
        request(options, async (req: Request, res: Response) => {
            expect(await res.statusCode).toEqual(401);
        }); 
        done();
    });
    
    it("test 2: fails to create product with wrong parameters (pname, price, password):", function (done) {
        request({method: 'POST', url:'http://localhost:3000/users/login', body: {username:testUser.username, password: testUser.password}, json: true}, async (_req:Request, res: Response, body) => {
               const token = await body
               const options = {
                method: 'POST',
                url: endpoint,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: {pname: 'asmin', price: 'adsae', password:'pawefwer'},
                json: true
            }

            request(options, async (req: Request, res: Response) => {
                expect(await res.statusCode).toEqual(401);
            });
        });
        
        done();
    });
    
    it("test 3: Creates product with correct parameters (name, price, category).", function (done) {
        request({method: 'POST', url:'http://localhost:3000/users/login', body: {username:testUser.username, password: testUser.password}, json: true}, async (_req:Request, res: Response, body) => {
            const token = await body
            const options = {
                method: 'POST',
                url: endpoint,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: {name: 'timberland', price: 2.4, category:'shoes'},
                json: true
            }

            request(options, async (req: Request, res: Response) => {
                expect(await res.statusCode).toEqual(200);
            }); 
        });        
        done();
    });
    
});

