import express from "express";
import { requireAdmin } from "../middleware/authAdmin.js";
import {
  getAllSkill,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from "../controllers/admin/SkillController.js";

import {
  getAllSkillBuff
} from "../controllers/admin/SkillBuffController.js";

import {
  getAllSkillTooptip,
  updateTooltip
} from "../controllers/admin/TooltipController.js";

import {
  getAllJobs,
  updateJob
} from "../controllers/admin/JobController.js";

const router = express.Router();

router.use(requireAdmin);

//SKILLS
router.get("/skills", getAllSkill);
router.get("/skills/:id", getSkillById);
router.post("/skills", createSkill);
router.put("/skills/:id", updateSkill);
router.delete("/skills/:id", deleteSkill);

//SKILLS BUFF
router.get("/skills-buff/", getAllSkillBuff);

//SKILLS TOOLTIP
router.get("/skills-tooltip/", getAllSkillTooptip);
router.put("/skills-tooltip/:id", updateTooltip);

//JOBS
router.get("/jobs/", getAllJobs);
router.put("/jobs/:id", updateJob);

export default router;
