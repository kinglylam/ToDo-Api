"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Authcontroller_1 = require("../controllers/Authcontroller");
const router = (0, express_1.Router)();
router.post("/register", Authcontroller_1.registerUser);
router.post("/login", Authcontroller_1.loginUser);
exports.default = router;
