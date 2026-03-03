import express from "express";
import {
  getAllSkill,
  getAllJobList,
  getJobList,
  getSkillList,
  getSkillDetail
} from "../controllers/SkillController.js";

const router = express.Router();

router.get("/get-all-skill", getAllSkill);
router.get("/get-all-job-list", getAllJobList);
router.post("/get-job-list", getJobList);
router.post("/get-skill-list", getSkillList);
router.post("/get-skill-list-detail", getSkillDetail);

export default router;
