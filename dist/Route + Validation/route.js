"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fsAsync_1 = require("../Utilities/fsAsync");
const imageProcessor_1 = require("../Utilities/imageProcessor");
const validateParams_1 = __importDefault(require("./validateParams"));
const router = (0, express_1.Router)();
/**
 * GET /api/images?filename=fjord&width=300&height=200
 * Only .jpg under assets/full are supported. Cached file is saved under assets/thumb.
 */
router.get('/', validateParams_1.default, async (req, res) => {
    const filename = String(req.query.filename);
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const srcPath = path_1.default.resolve('assets/full', `${filename}.jpg`);
    const outName = `${filename}_${width}x${height}.jpg`;
    const outPath = path_1.default.resolve('assets/thumb', outName);
    try {
        // verify source image exists
        if (!(await (0, fsAsync_1.fileExists)(srcPath))) {
            return res.status(404).json({
                error: `Source image not found: ${filename}.jpg (place it in assets/full)`
            });
        }
        // make sure cache dir exists
        await (0, fsAsync_1.ensureThumbDir)();
        // cache hit
        if (await (0, fsAsync_1.fileExists)(outPath)) {
            return res.sendFile(outPath);
        }
        // process & cache
        await (0, imageProcessor_1.resizeJpg)(srcPath, outPath, width, height);
        return res.sendFile(outPath);
    }
    catch (err) {
        return res.status(500).json({ error: 'Failed to process image.' });
    }
});
exports.default = router;
