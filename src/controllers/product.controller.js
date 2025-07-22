class ProductController {
  static index = (req, res) => {
    res.render("commercial/products/index", {
      title: "Products",
      activePage: "products",
      layout: "_layouts/main",
      scripts: ["/js/products.js"],
      styles: ["/css/products.css"],
    });
  };
  static create = (req, res) => {
    res.render("", {
      title: "",
      activePage: "",
      layout: "",
      scripts: [],
      styles: [],
    });
  };
  static update = (req, res) => {
    res.render("", {
      title: "",
      activePage: "",
      layout: "",
      scripts: [],
      styles: [],
    });
  };
  static delete = (req, res) => {
    res.render("", {
      title: "",
      activePage: "",
      layout: "",
      scripts: [],
      styles: [],
    });
  };
  static readById = (req, res) => {
    res.render("", {
      title: "",
      activePage: "",
      layout: "",
      scripts: [],
      styles: [],
    });
  };
  static readAll = (req, res) => {
    res.render("", {
      title: "",
      activePage: "",
      layout: "",
      scripts: [],
      styles: [],
    });
  };
}

module.exports = ProductController;
