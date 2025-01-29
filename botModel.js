const { fork } = require("child_process");
const logger = require('./logging');

module.exports = class botModel {
    constructor(guild_id) {
        this.musicBotWorker = fork("music_bot/index.js");
        this.initPromise = new Promise((resolve, reject) => {
            this.musicBotWorker.on("message", async (msg) => {
                if (msg["action"] === "log") {
                    logger.info(`[Worker ${guild_id}] ${msg.message}`);
                }
                if (msg["action"] === "initialized") {
                    logger.info(`[Worker ${guild_id}] Initialization complete.`);
                    resolve(); // Resolves when initialization completes
                }
            });

            this.musicBotWorker.on("error", (err) => {
                logger.error(`[Worker ${guild_id}] Process error:`, err);
                reject(err); // Rejects if an error occurs
            });

            this.musicBotWorker.on("exit", (code, signal) => {
                logger.warn(`[Worker ${guild_id}] Process exited with code ${code}, signal ${signal}`);
            });
        });
    }

    leaveMusic(client) {
        if (this.musicBotWorker) {
            this.musicBotWorker.kill(); // Terminates the worker process
            logger.info(`[Worker ${guild_id}] Music bot process killed`);
        }
    }
}
