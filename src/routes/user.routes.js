const express = require("express");
const { check } = require("express-validator");

const router = express.Router();

const userController = require("../controllers/user.controller");

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.post(
  "/",
  [
    check("username").not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 5 }),
    check("name").not().isEmpty(),
    check("family").not().isEmpty(),
  ],
  userController.createUser
);
router.put(
  "/:id",
  [
    check("username").not().isEmpty(),
    check("password").not().isEmpty().isLength({ min: 5 }),
    check("name").not().isEmpty(),
    check("family").not().isEmpty(),
  ],
  userController.updateUser
);
router.delete("/:id", userController.deleteUser);

module.exports = router;
