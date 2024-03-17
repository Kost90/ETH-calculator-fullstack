import express from "express";
import { getCryptoPrices } from "../controller/CryptopricesController";
const router = express.Router();

router.get("/", getCryptoPrices);

export default router