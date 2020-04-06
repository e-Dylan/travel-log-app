/*
    Router Script for /logs route
    Handles all incoming routes to the server [On /logs route]
    Gives any form of required response to incoming routes.
*/

const { Router } = require("express");

const LogEntry = require("../models/LogEntry");

const router = Router();

// Any get request to api/logs route: return all log entries in database.
router.get("/", async (req, res) => {
    try {
        const entries = await LogEntry.find();
        res.json(entries);
    } catch (error) {
        next(error);
    }
});

// Handle any post request on '/'
router.post("/", async (req, res, next) => {
    try {
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error) {
        if (error.name === "ValidationError") {
            res.status(422);
        }
        // If error occurs creating the log entry (validators, given params)
        // pass the error on to the error handler middlewares (middlewares.js).
        next(error);
    }

    console.log(req.body);
});

module.exports = router;