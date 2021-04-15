import express, { Request, Response } from "express";
import { Users, IUser } from '../../src/models/Users';
const request = require('request');
const app = require('../../src/server');
const dotenv = require('dotenv');

const endpoint = 'http://localhost:3000/orders';

const testUser: IUser = {firstname: 'test', lastname: 'user', username: 'admin', password:'password'};


describe(`7: Get orders by user id: ${endpoint}/users/1`, function () {
    
    it("test 1: fails to get orders with authentication token not provided.", function (done) {        
        request.get(`${endpoint}/users/1`, async (req: Request, res: Response) => {
            expect(await res.statusCode).toEqual(401);
        });
        done();
    });
    
    it("test 2: gets orders with authentication token provided.", function (done) {
      request({method: 'POST', url:'http://localhost:3000/users/login', body: {username:testUser.username, password: testUser.password}, json: true}, async (_req:Request, res: Response, body) => {
          const token =  await body
          const options = {
                method: 'GET',
                url: `${endpoint}/users/1`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                json: true
            }
            request(options, async (req: Request, res: Response) => {
                expect(await res.statusCode).toEqual(200);
            });
      });
        
        done();
    });
    
});

describe(`8: Get Completed orders: ${endpoint}/users/1/complete`, function () {
    it("test 1: fails to get completed orders with missing authentication token.", function (done) {
        request.get(`${endpoint}/users/1/complete`, async (req: Request, res: Response) => {
            expect(await res.statusCode).toBe(401);
        });
        done();
    });
    
    it("test 2: gets completed orders with authentication token provided.", function (done) {
        
       request({method: 'POST', url:'http://localhost:3000/users/login', body: {username:testUser.username, password: testUser.password}, json: true}, async (_req:Request, res: Response, body) => {
           const token = await body
           const options = {
                method: 'GET',
                url: `${endpoint}/users/1/complete`,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                json: true
            }

            request(options, async (req: Request, res: Response) => {
                expect(await res.statusCode).toEqual(200);
            });
       
       });
        done();
    });    
});