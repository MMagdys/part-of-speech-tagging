import 'reflect-metadata';
import 'module-alias/register';

import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import express, { Application } from 'express';
import {  InversifyExpressServer } from 'inversify-express-utils';
import path from 'path';
import './api/v1/controllers';
import container from './container';
import Container from 'inversify/lib/interfaces/interfaces'
import config from './config';
const cors = require('@pbb/middlewares/cors')



class App {

    public app: Application;
    private mongoUrl = config.mongoUrl;
    

    constructor() {

        const server = new InversifyExpressServer(container);
        server.setConfig((app: Application) => {

            app.set('view engine', 'ejs');
            app.set('views', 'views');
            app.use(express.static(path.join(__dirname, '../public')));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
            app.use(cors.corsWithOptions);
            this.mongoSetup();
        });

        this.app = server.build();
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl).catch((err: Error) => console.error(err.message));
    }

}


export default new App().app;
