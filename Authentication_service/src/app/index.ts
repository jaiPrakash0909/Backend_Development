import express from "express";
import type { Express } from 'express'

import { authRouter } from "./auth/routes";

export function createApplication(): Express {
    const app = express()

    //Middleware
    app.use(express.json())


    // Routes
    app.get('/', (req, res) => {
        return res.json({message: 'Welcome to auth Service'})
    })

    app.use('/auth', authRouter)

    return app
}