const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const userApiController = require("../../../usecases/security/controllers/user/user.api.controller");

router.get("/", userApiController.getUsers);
router.get("/:id", userApiController.getUserById);
router.post(
  "/",
  [
    check("username").not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 5 }),
    check("name").not().isEmpty(),
    check("family").not().isEmpty(),
  ],
  userApiController.createUser
);
router.put(
  "/:id",
  [
    check("username").not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 5 }),
    check("name").not().isEmpty(),
    check("family").not().isEmpty(),
  ],
  userApiController.updateUser
);
router.delete("/:id", userApiController.deleteUser);

module.exports = router;
