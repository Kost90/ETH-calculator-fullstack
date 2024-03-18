"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CryptopricesController_1 = require("../controller/CryptopricesController");
const router = express_1.default.Router();
router.get("/", CryptopricesController_1.getCryptoPrices);
exports.default = router;
//# sourceMappingURL=Cryptoprices.js.map