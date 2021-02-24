import { Router } from "express";
import { getController } from "./myroute.handlers";
      
const router = Router();
      
router.route('/').get(getController)

export default router;