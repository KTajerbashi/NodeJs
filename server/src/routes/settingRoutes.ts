import { Router } from "express";

import {
  getAll,
  getByKey,
  create,
  update,
  remove,
} from "../controllers/settingController.js";

const router = Router();

router.get("/", getAll);

router.get("/:key", getByKey);

router.post("/", create);

router.put("/:key", update);

router.delete("/:key", remove);

export default router;