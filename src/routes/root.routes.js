const { router } = require("../global.using");

router.use(require("./security/auth.routes"));

// router.use(require("./useCases/product.routes"));
// router.use(require("./useCases/report.routes"));
// router.use(require("./useCases/role.routes"));
// router.use(require("./useCases/system.routes"));
// router.use(require("./useCases/user.routes"));

router.use(require("./common/common.routes"));

module.exports = router;
