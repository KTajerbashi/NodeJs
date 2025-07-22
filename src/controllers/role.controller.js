class RoleController {
  static index = (req, res) => {
    res.render("security/roles/index", {
      title: "Roles",
      activePage: "roles",
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
module.exports = RoleController;
