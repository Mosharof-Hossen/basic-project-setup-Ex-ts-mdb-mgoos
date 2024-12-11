import { Router } from "express";
import { adminControllers } from "./admin.controller";

const router = Router()

router.get("/", adminControllers.getAllAdmins);
router.get("/:id", adminControllers.getSingleAdmins);
router.patch("/:id", adminControllers.updateAdmin);

export const adminRouters = router