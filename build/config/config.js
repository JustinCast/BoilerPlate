"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
exports.c = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME
};
