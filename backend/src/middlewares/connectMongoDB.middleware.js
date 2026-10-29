import connectMongoDB from "../config/mongo.configDB.js";

async function connectMongoDBMiddleware(req, res, next) {
    try {
        await connectMongoDB();
        next();
    } catch (error) {
        console.error("Error conectando MongoDB:", error);
        res.status(503).json({
            message: "No se pudo conectar a la base de datos"
        });

    };
}

export default connectMongoDBMiddleware; 