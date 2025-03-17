import winston from 'winston';

export const logger = winston.createLogger({
    level: 'info', 
    format: winston.format.json(),
    defaultMeta: {
        service: 'animal-service'
    },
    transports: [
        new winston.transports.File({ filename: 'logs/error.log', level: 'error'}),
        new winston.transports.File({ filename: 'logs/combined.log' }),
    ],
});

    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        // format: winston.format.simple(),
        // format: winston.format.prettyPrint(),
        format: winston.format.printf(log.message)
    }));
}