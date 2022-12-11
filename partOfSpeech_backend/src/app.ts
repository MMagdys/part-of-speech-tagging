import 'reflect-metadata';
import 'module-alias/register';

import * as bodyParser from 'body-parser';
import express, { Application } from 'express';
import {  InversifyExpressServer } from 'inversify-express-utils';
import path from 'path';
import './api/v1/controllers';
import container from './container';
import Container from 'inversify/lib/interfaces/interfaces'



class App {

    public app: Application;

    constructor() {

        const server = new InversifyExpressServer(container);
        server.setConfig((app: Application) => {

            app.set('view engine', 'ejs');
            app.set('views', 'views');
            app.use(express.static(path.join(__dirname, '../public')));
            app.use(bodyParser.json());
            app.use(bodyParser.urlencoded({ extended: true }));
        });

        this.app = server.build();
    }

}


export default new App().app;
