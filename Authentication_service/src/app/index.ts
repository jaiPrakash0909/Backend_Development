import express from "express";
import type { Express } from 'express'

import { authRouter } from "./auth/routes";
import { authenticationMiddleware } from "./middleware/auth-middleware";

export function createApplication(): Express {
    const app = express()

    //Middleware
    app.use(express.json())
    app.use(authenticationMiddleware())


    // Routes
    app.get('/', (req, res) => {
        return res.json({message: 'Welcome to auth Service'})
    })

    app.use('/auth', authRouter)

    return app
}