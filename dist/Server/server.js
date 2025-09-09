"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("../Route + Validation/route"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3001;
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Static serving (optional): allow browsing cached thumbs
app.use('/thumb', express_1.default.static(path_1.default.resolve('assets/thumb')));
// API routes
app.use('/api/images', route_1.default);
// Health
app.get('/health', (_req, res) => {
    res.json({ ok: true });
});
// Global error handler (last)
app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: 'Unexpected server error.' });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
exports.default = app; // for testing
