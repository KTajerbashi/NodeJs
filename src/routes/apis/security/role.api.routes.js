const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const roleApiController = require("../../../usecases/security/controllers/role/role.api.controller");

router.get("/", roleApiController.getRoles);
router.get("/:id", roleApiController.getRoleById);
router.post(
  "/",
  [
    check("title").not().isEmpty().isLength({ min: 5 }),
    check("name").not().isEmpty().isLength({ min: 5 }),
  ],
  roleApiController.createRole
);
router.put(
  "/:id",
  [
    check("title").not().isEmpty().isLength({ min: 5 }),
    check("name").not().isEmpty().isLength({ min: 5 }),
  ],
  roleApiController.updateRole
);
router.delete("/:id", roleApiController.deleteRole);

module.exports = router;
