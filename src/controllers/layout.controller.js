const index = (req, res) => {
  res.render("home/index", {
    title: "Home",
    activePage: "home",
    layout: "_layouts/main",
    scripts: ["/js/home.js"],
    styles: ["/css/home.css"],
  });
};

const dashboard = (req, res) => {
  res.render("dashboard/index", {
    title: "Dashboard",
    activePage: "dashboard",
    userCount: 100,
    activeUsers: 15,
  });
};

const profile = (req, res) => {
  res.render("account/profile", {
    title: "Profile",
    activePage: "profile",
    model: res.locals.auth,
  });
};

const about = (req, res) => {
  res.render("about/index", {
    title: "About",
    activePage: "about",
    userCount: 100,
    activeUsers: 15,
  });
};

module.exports = {
  index,
  dashboard,
  profile,
  about,
};
