import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import {
  getAllJobs,
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
  fetchFromUrl,
} from "../controllers/jobs";

const router = Router();

router.get("/", authenticate, getAllJobs);

router.post("/", authenticate, createJob);

router.get("/:id", authenticate, getSingleJob);

router.put("/:id", authenticate, updateJob);

router.delete("/:id", authenticate, deleteJob);

router.post("/fetch-from-url", authenticate, fetchFromUrl);

export default router;
