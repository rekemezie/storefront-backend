import express, { Request, Response } from "express";
const request = require('request');
const app = require('../../src/server');
const dotenv = require('dotenv');
const authenticateToken = require('../../jwt_auth/auth');

const endpoint = 'http://localhost:3000/users';

describe(`1: Users Endpoint: ${endpoint}`, function () {
    it("test 1: fails to get users when authenticaation token is missings.", function (done) {
        request.get(endpoint, async (req: Request, res: Response) => {
            expect(await res.statusCode).toEqual(401);
        }); 
        done();
    });
    
    it("test 2: gets all users when authentication token is correct.", function (done) {
        request.get(endpoint, {'auth': {'bearer':process.env.TOKEN}}, async (req: Request, res: Response) => {
            let code = await res.statusCode;
            expect(code).toEqual(200);
        }); 
        done();
    });
    
});

describe(`2: Get Users by ID Endpoint: ${endpoint}/1`, function () {
    it("test 1: fails to get user when authentication token is missings.", function (done) {
        request.get(`${endpoint}/1`, async (req: Request, res: Response) => {
            let code = await res.statusCode;
            expect(code).toEqual(401);
        });
        done();
    });
    
    it("test 2: gets user when authentication token is passed.", function (done) {

        const options = {
            method: 'get',
            url: 'http://localhost:3000/users/1',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TOKEN}`
            },
            json: true
        }

        request(options, async (req: Request, res: Response) => {
            expect(await res.statusCode).toEqual(200);
        });
        done();
    });
    
});

describe(`3: Create Users Endpoint: ${endpoint}`, function () {
    it("test 1: fails to create user when authentication token is missings.", function (done) {
        request.post(endpoint, async (req: Request, res: Response) => {
            expect(await res.statusCode).toEqual(401);
        });
        done();
    });
    
    it("test 2: Creates user when authentication token id passed.", function (done) {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/users',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.TOKEN}`
            },
            body: {firstname: 'test', lastname: 'user', username: 'admin', password:'password'},
            json: true
        }
        
        request(options, async (req: Request, res: Response) => {
            expect(await res.statusCode).toEqual(200);
        }); 
        done();
    });
    
});

