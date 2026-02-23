import { Router } from "express";
import {
  getContactDetails,
  updateContactDetails,
} from "../controllers/contact.controller";

const router = Router();

router.get("/", getContactDetails);
router.put("/", updateContactDetails);

export default router;