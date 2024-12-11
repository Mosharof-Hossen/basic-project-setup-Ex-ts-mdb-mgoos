import { Router } from "express";
import { adminControllers } from "./admin.controller";

const router = Router()

router.get("/", adminControllers.getAllAdmins);
router.get("/:id", adminControllers.getSingleAdmins);

export const adminRouters = router