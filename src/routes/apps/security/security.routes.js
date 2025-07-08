const express = require("express");
const router = express.Router();

const userController = require("../../../usecases/security/controllers/user/user.controller");
// const roleController = require("../../usecases/security/controllers/role/role.controller");

router.get("/team", userController.team);
router.get("/users", userController.users);

// router.get("/users", dashboardController.dashboard);
// router.get("/projects", dashboardController.projects);
// router.get("/team", dashboardController.team);
// router.get("/calendar", dashboardController.calendar);
// router.get("/documents", dashboardController.documents);
// router.get("/", dashboardController.index);

module.exports = router;
