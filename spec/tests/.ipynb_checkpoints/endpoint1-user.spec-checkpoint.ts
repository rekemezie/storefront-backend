import express, { Request, Response } from "express";

const app = require('../../src/server');
const request = require('request');
const dotenv = require('dotenv');
const authenticateToken = require('../../jwt_auth/auth');

const endpoint = 'http://localhost:3000/users';

describe(`1: Users Endpoint: ${endpoint}`, function () {
    it("test 1: fails to get users when authenticaation token is missings.", function (done) {
        request.get(endpoint, (req: Request, res: Response) => {
            expect(res.statusCode).toEqual(401);
        }); 
        done();
    });
    
    it("test 2: gets all users when authentication token is correct.", function (done) {
        request.get(endpoint, {'auth': {'bearer':process.env.TOKEN}},  (req: Request, res: Response) => {
            const code =  res.statusCode;
            expect(code).toEqual(200);
        }); 
        done();
    });
    
});

describe(`2: Get Users by ID Endpoint: ${endpoint}/1`, function () {
    it("test 1: fails to get user when authentication token is missings.", function (done) {
        request.get(`${endpoint}/1`,  (req: Request, res: Response) => {
            const code =  res.statusCode;
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

        request(options, (req: Request, res: Response) => {
            
            expect(res.statusCode).toEqual(200);
        });
        done();
    });
    
});

describe(`3: Create Users Endpoint: ${endpoint}`, function () {
    it("test 1: fails to create user with wrong body parameters.", function (done) {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {fname: 'test', lname: 'user', username: 'admin'},
            json: true
        }
        
        request(options, (req: Request, res: Response) => {
            expect(res.statusCode).toEqual(401);
        }); 
        done();
    });
    
    it("test 2: Creates user with correct body parameters.", function (done) {
        const options = {
            method: 'POST',
            url: 'http://localhost:3000/users',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {firstname: 'test', lastname: 'user', username: 'admin', password:'password'},
            json: true
        }
        
        request(options, (req: Request, res: Response) => {
            expect(res.statusCode).toEqual(200);
        }); 
        done();
    });
    
});

