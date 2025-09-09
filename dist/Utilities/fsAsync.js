"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileExists = fileExists;
exports.ensureThumbDir = ensureThumbDir;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
async function fileExists(p) {
    try {
        await fs_1.promises.access(p);
        return true;
    }
    catch {
        return false;
    }
}
async function ensureThumbDir() {
    const dir = path_1.default.resolve('assets/thumb');
    if (!(await fileExists(dir))) {
        await fs_1.promises.mkdir(dir, { recursive: true });
    }
}
