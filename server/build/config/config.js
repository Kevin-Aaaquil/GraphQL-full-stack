"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.default = {
    //mongo connection uri
    MONGO_URI: process.env.MONGO_URI,
    // DB_NAME
    DB_NAME: process.env.DB_NAME,
    // port
    PORT: process.env.PORT || 3000,
    // NODE_ENV
    NODE_ENV: process.env.NODE_ENV,
};
//# sourceMappingURL=config.js.map