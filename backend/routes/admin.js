import express from "express";
import { requireAdmin } from "../middleware/authAdmin.js";
import { getAllSkill } from "../controllers/skillController.js";

const router = express.Router();

router.get("/skills", requireAdmin, getAllSkill);

export default router;
