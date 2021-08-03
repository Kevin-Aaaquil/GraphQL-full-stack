"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("./config"));
let db;
async function connect() {
    const client = new mongodb_1.MongoClient(config_1.default.MONGO_URI, {
        ignoreUndefined: true
    });
    console.log("✅ : database connected");
    return client.db(config_1.default.DB_NAME);
}
async function DB() {
    if (!db) {
        db = await connect();
        return db;
    }
    return db;
}
exports.default = DB;
//# sourceMappingURL=db.js.map