const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

const eventController = require("../../../usecases/dashboard/controllers/event.api.controller");

router.post("/", [], eventController.createEvent);
router.put("/:id", [], eventController.updateEvent);
router.delete("/:id", [], eventController.deleteEvent);
router.get("/:id", [], eventController.getEventById);
router.get("/", [], eventController.getEvents);

module.exports = router;
