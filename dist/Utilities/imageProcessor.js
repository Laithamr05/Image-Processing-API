"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeJpg = resizeJpg;
const sharp_1 = __importDefault(require("sharp"));
async function resizeJpg(srcPath, outPath, width, height) {
    await (0, sharp_1.default)(srcPath).resize(width, height).jpeg({ quality: 85 }).toFile(outPath);
}
