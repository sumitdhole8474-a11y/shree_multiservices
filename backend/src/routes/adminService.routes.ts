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
   MULTER CONFIG (FIXED FOR VERCEL)
================================ */
// Use memoryStorage instead of dest: "services/" 
// to avoid "Read-only file system" errors on Vercel.
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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