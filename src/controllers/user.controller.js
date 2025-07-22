class UserController {
  static index = (req, res) => {
    res.render("security/users/index", {
      title: "Users",
      activePage: "users",
      layout: "_layouts/main",
    });
  };
  static create = (req, res) => {};
  static update = (req, res) => {};
  static delete = (req, res) => {};
  static readById = (req, res) => {};
  static readAll = (req, res) => {};
}

module.exports = UserController;
