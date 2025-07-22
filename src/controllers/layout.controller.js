class LayoutController {
  static index = (req, res) => {
    res.render("home/index", {
      title: "Home",
      activePage: "home",
      layout: "_layouts/main",
      scripts: ["/js/home.js"],
      styles: ["/css/home.css"],
    });
  };
  static dashboard = (req, res) => {
    res.render("dashboard/index", {
      title: "Dashboard",
      activePage: "dashboard",
      userCount: 100,
      activeUsers: 15,
    });
  };
  static profile = (req, res) => {
    res.render("account/profile", {
      title: "Profile",
      activePage: "profile",
      model: res.locals.auth,
    });
  };
  static about = (req, res) => {
    res.render("about/index", {
      title: "About",
      activePage: "about",
      userCount: 100,
      activeUsers: 15,
    });
  };
}

module.exports = LayoutController;
