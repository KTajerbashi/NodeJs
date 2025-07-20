const { router } = require("../../global.using");

const controller = require("../../controllers/system.controller");

router.get("/system", controller.index);

module.exports = router;
