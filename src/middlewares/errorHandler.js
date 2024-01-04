// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
    let statusCode = 500;

    if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = {};

        for (const field in err.errors) {
            errors[field] = err.errors[field].message;
        }

        return res.status(statusCode).json({
            error: {
                status: statusCode,
                message: 'Error de validación',
                errors,
            },
        });
    }

    if (err.statusCode) {
        statusCode = err.statusCode;
    }

    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: err.message || 'Ha ocurrido un error en el servidor.',
        },
    });
};

module.exports = errorHandlerMiddleware;
