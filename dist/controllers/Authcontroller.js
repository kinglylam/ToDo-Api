"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_1 = require("../models/User");
const config_1 = require("../config/config");
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        let user = yield User_1.User.findOne({ email });
        if (user)
            return res.status(400).json({ message: "User already exists" });
        user = new User_1.User({ email, password });
        yield user.save();
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.config.jwtSecret, {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield User_1.User.findOne({ email });
        if (!user)
            return res.status(400).json({ message: "Invalid Credentials" });
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Invalid Credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, config_1.config.jwtSecret, {
            expiresIn: "1h",
        });
        res.json({ token });
    }
    catch (err) {
        res.status(500).send("Server Error");
    }
});
exports.loginUser = loginUser;
