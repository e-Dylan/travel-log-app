const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// Bring in environment variables file
require("dotenv").config();

const middlewares = require("./middlewares");
const logs = require("./api/logs");

const app = express();

// Connect to the mongoDB database
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Middlewares
app.use(morgan("common"));          // morgan middleware -> terminal logger
app.use(helmet());                  // helemet middleware -> protects chrome headers
app.use(cors({                      // cors
    origin: process.env.CORS_ORIGIN,
}));
app.use(express.json());            // body parsing middleware

app.get("/", (req, res) => {
    res.json({
        message: "got request",
    })
})

app.use("/api/logs", logs);

/* Middleware imports */
app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
