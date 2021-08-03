"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const config_1 = __importDefault(require("./config"));
const express_graphql_1 = require("express-graphql");
const schema_1 = __importDefault(require("./models/schema"));
app.use('/graphql', express_graphql_1.graphqlHTTP({
    schema: schema_1.default
}));
const port = config_1.default.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
});
//# sourceMappingURL=app.js.map