class SystemController {
  static index = (req, res) => {
    console.log("SystemController.index");
    res.render("system/index", {
      title: "System",
      activePage: "system",
      layout: "_layouts/main",
    });
  };
  static create = (req, res) => {
    res.render("", {});
  };
  static update = (req, res) => {
    res.render("", {});
  };
  static delete = (req, res) => {
    res.render("", {});
  };
  static readById = (req, res) => {
    res.render("", {});
  };
  static readAll = (req, res) => {
    res.render("", {});
  };
}

module.exports = SystemController;
