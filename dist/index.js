"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const TodoRoutes_1 = __importDefault(require("./routes/TodoRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/api/users", UserRoutes_1.default);
app.use("/api/todos", TodoRoutes_1.default);
// Connect to MongoDB
mongoose_1.default
    .connect(config_1.config.mongoURI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB connection error", err));
const PORT = config_1.config.port || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
