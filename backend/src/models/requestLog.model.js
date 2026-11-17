import mongoose from 'mongoose';

const requestLogSchema = new mongoose.Schema(
    {
        ip: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        endpoint: {
            type: String,
            required: true
        },
        method: {
            type: String,
            required: true
        },
        statusCode: {
            type: Number,
            required: true
        },
        responseTimeMs: {
            type: Number,
            required: true
        },
        timestamp: {
            type: Date,
            required: true,
            default: Date.now
        },
        user_id: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

// TTL: MongoDB elimina automaticamente los logs con mas de 60 dias
requestLogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 60 });

export const REQUEST_LOG_COLLECTION_NAME = 'RequestLog';
const requestLogModel = mongoose.model(REQUEST_LOG_COLLECTION_NAME, requestLogSchema);

export default requestLogModel;
