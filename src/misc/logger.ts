import { createLogger, format, transports } from "winston";

const logFormat = format.printf(({ level, message, timestamp, stack }) => {
    return `[${timestamp}] [${level}] | ${stack || message}`;
});

const logger = createLogger({
    format: format.combine(
        format.colorize(),
        format.timestamp({ format: "YYYY-MM-DD hh:mm:ss" }),
        logFormat
    ),
    transports: [new transports.Console()],
});

export default logger;
