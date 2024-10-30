import express from 'express';

import { postJob ,getAllJobs,getJobById,adminCreatedJobs} from '../controllers/job.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
const router = express.Router();
router.route("/post").post(isAuthenticated,postJob);
router.route("/get").get(isAuthenticated,getAllJobs);
router.route("/get/:id").get(isAuthenticated,getJobById);
router.route("/getadminjobs").get(isAuthenticated,adminCreatedJobs);
export default router; 