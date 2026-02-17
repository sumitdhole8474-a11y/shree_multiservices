import { Router } from "express";
import multer from "multer";
import {
  createService,
  getAllServicesAdmin,
  deleteService,
  updateService,
  toggleServiceVisibility,
} from "../controllers/adminService.controller";

const router = Router();

/* ===============================
   MULTER CONFIG
================================ */
const upload = multer({ dest: "services/" });

/* ===============================
   ROUTES
================================ */

// Create service
router.post("/", upload.single("image"), createService);

// Get all services (admin)
router.get("/", getAllServicesAdmin);

// Update service (image optional)
router.put(
  "/:id",
  upload.single("image"),
  updateService
);

// Hide / Unhide service
router.patch(
  "/:id/toggle",
  toggleServiceVisibility
);

// Delete service
router.delete("/:id", deleteService);

export default router;
