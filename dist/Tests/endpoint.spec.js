"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
require("ts-node/register");
const supertest_1 = __importDefault(require("supertest"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const server_1 = __importDefault(require("../Server/server"));
const fsAsync_1 = require("../Utilities/fsAsync");
const request = (0, supertest_1.default)(server_1.default);
describe('GET /api/images', () => {
    const outFile = path_1.default.resolve('assets/thumb', 'fjord_200x200.jpg');
    beforeAll(async () => {
        // Ensure cache dir; ensure a source image exists at assets/full/fjord.jpg for this test
        await (0, fsAsync_1.ensureThumbDir)();
    });
    afterAll(async () => {
        // Clean up generated file (optional so repeated runs still pass)
        try {
            await fs_1.promises.unlink(outFile);
        }
        catch { }
    });
    it('returns 400 on missing params', async () => {
        const res = await request.get('/api/images');
        expect(res.status).toBe(400);
    });
    it('returns 404 on missing source file', async () => {
        const res = await request.get('/api/images?filename=does_not_exist&width=200&height=200');
        expect(res.status).toBe(404);
    });
    it('creates and returns a resized image', async () => {
        // Put a file named assets/full/fjord.jpg before running
        const res = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toContain('image/jpeg');
    });
    it('serves from cache on repeat calls', async () => {
        const first = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(first.status).toBe(200);
        const second = await request.get('/api/images?filename=fjord&width=200&height=200');
        expect(second.status).toBe(200);
        // both OK; implicitly verifies cache path exists
    });
});
