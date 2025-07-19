class SystemController {
  index = (req, res) => {
    console.log("SystemController.index");
    res.render("system/index", {
      title: "System",
      activePage: "system",
      layout: "_layouts/main",
    });
  };
  create = () => {};
  update = () => {};
  delete = () => {};
  readById = () => {};
  readAll = () => {};
}

module.exports = new SystemController();
