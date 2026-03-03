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
  getAllSkillBuff,
  updateSkillBuff
} from "../controllers/admin/SkillBuffController.js";

import {
  getAllSkillTooptip,
  updateTooltip
} from "../controllers/admin/TooltipController.js";

import {
  getAllJobs,
  updateJob
} from "../controllers/admin/JobController.js";

import {
  getAllStatusEffect,
  updateStatusEffect
} from "../controllers/admin/StatusController.js";

import {
  getAllJobSkills,
  updateJobSkill
} from "../controllers/admin/JobSKillController.js";

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
router.put("/skills-buff/:id", updateSkillBuff);


//SKILLS TOOLTIP
router.get("/skills-tooltip/", getAllSkillTooptip);
router.put("/skills-tooltip/:id", updateTooltip);

//JOBS
router.get("/jobs/", getAllJobs);
router.put("/jobs/:id", updateJob);

//JOBS SKILL
router.get("/job-skills/", getAllJobSkills);
router.put("/jobs/:id", updateJobSkill);

//STATUS EFFECT
router.get("/status-effect/", getAllStatusEffect);
router.put("/status-effect/:id", updateStatusEffect);

export default router;
