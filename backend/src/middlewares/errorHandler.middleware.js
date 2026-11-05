function errorHandler(error, req, res, next) {
    //error controlado
    if (error.status) {
        return res.status(error.status).json({
            ok: false,
            status: error.status,
            code: error.code || null,
            message: error.message,
        });
    }
    // Error de Token expirado en JWT
    if (error.name === "TokenExpiredError") {
        return res.status(401).json({
            ok: false,
            status: 401,
            code: "TOKEN_EXPIRED",
            message: "Token has expired",
        });
    }

    // Error de Token inválido en JWT (firma inválida, malformado, etc.)
    if (error.name === "JsonWebTokenError" || error.name === "NotBeforeError") {
        return res.status(401).json({
            ok: false,
            status: 401,
            code: "INVALID_TOKEN",
            message: "Invalid token",
        });
    }

    // Error de ID inválido en Mongoose (CastError)
    if (error.name === "CastError") {
        return res.status(400).json({
            ok: false,
            status: 400,
            code: "INVALID_ID",
            message: `Identificador inválido: '${error.value}' para el campo '${error.path}'`,
        });
    }

    // Error de validación de esquemas en Mongoose (ValidationError)
    if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({
            ok: false,
            status: 400,
            code: "VALIDATION_ERROR",
            message: "Error de validación",
            errors: messages,
        });
    }

    // Error no controlado
    console.error("Error no controlado:", error);
    return res.status(500).json({
        ok: false,
        status: 500,
        code: "INTERNAL_SERVER_ERROR",
        message: "internal server error",
    });
};

export default errorHandler;
