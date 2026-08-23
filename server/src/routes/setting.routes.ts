import { Router } from "express";

import {
  getAll,
  getByKey,
  create,
  update,
  remove,
} from "../controllers/setting.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAll);

router.get("/:key", getByKey);

router.post("/", create);

router.put("/:key", update);

router.delete("/:key", remove);

export default router;