import requestLogModel from "../models/requestLog.model.js";

const loggerMiddleware = (req, res, next) => {
    const start = Date.now();

    // Se registra al terminar la respuesta para tener el statusCode real,
    // el tiempo de ejecucion y el req.user ya seteado por el authMiddleware
    res.on("finish", () => {
        try {
            requestLogModel.create({
                ip: req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.ip,
                url: req.originalUrl,
                endpoint: req.baseUrl || req.originalUrl,
                method: req.method,
                statusCode: res.statusCode,
                responseTimeMs: Date.now() - start,
                timestamp: new Date(),
                user_id: req.user?.id ?? null
            }).catch(error => console.error("Error guardando request log:", error));
        } catch (error) {
            // el logger jamas rompe la peticion del cliente
            console.error("Error en logger middleware:", error);
        }
    });

    next();
};

export default loggerMiddleware;
