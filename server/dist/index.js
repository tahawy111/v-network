"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
// Enable Dotenv
dotenv_1.default.config();
// Mongodb Connecting
mongoose_1.default.connect(`${process.env.DATABASE_URL}`).then(() => console.log("DB Connected"));
// App Configuration
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: true,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
// Routing
(0, routes_1.default)(app);
// Server Listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is Listening at http://localhost:${PORT}`));