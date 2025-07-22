class ReportController {
  static index = (req, res) => {
    res.render("reports/index", {
      title: "Reports",
      activePage: "reports",
      layout: "_layouts/main",
    });
  };
  static create = (req, res) => {
    res.render("", {
      activePage: "",
    });
  };
  static update = (req, res) => {
    res.render("", {
      activePage: "",
    });
  };
  static delete = (req, res) => {
    res.render("", {
      activePage: "",
    });
  };
  static readById = (req, res) => {
    res.render("", {
      activePage: "",
    });
  };
  static readAll = (req, res) => {
    res.render("", {
      activePage: "",
    });
  };
}
module.exports = ReportController;
