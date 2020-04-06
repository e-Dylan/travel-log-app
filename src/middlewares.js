
// Not found middle-ware (wants to be last that gets registered)
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Send this error to the NEXT middleware (error handler)
};

const errorHandler = (error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode); // set the status code
    res.json({
        message: error.message,
        // If we're in development, log the stack.
        // When we're in production, don't show the stack.
        stack: process.env.NODE_ENV === "production" ? ":)" : error.stack,
    });
};

module.exports = {
    notFound,
    errorHandler,
};