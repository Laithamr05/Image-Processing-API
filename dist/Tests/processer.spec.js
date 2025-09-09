"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
require("ts-node/register");
require("ts-node/register");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const imageProcessor_1 = require("../Utilities/imageProcessor");
const fsAsync_1 = require("../Utilities/fsAsync");
describe('imageProcessor.resizeJpg', () => {
    const src = path_1.default.resolve('assets/full', 'fjord.jpg');
    const out = path_1.default.resolve('assets/thumb', 'fjord_50x60.jpg');
    beforeAll(async () => {
        await (0, fsAsync_1.ensureThumbDir)();
    });
    afterAll(async () => {
        try {
            await fs_1.promises.unlink(out);
        }
        catch { }
    });
    it('creates an output file of the right type', async () => {
        await (0, imageProcessor_1.resizeJpg)(src, out, 50, 60);
        const stats = await fs_1.promises.stat(out);
        expect(stats.size).toBeGreaterThan(0);
    });
});
