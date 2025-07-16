const login = (req, res, next) => {
  res.json({
    name: "login",
  });
};

const logout = (req, res, next) => {
  res.json({
    name: "logout",
  });
};

const signup = (req, res, next) => {
  res.json({
    name: "signup",
  });
};

module.exports = {
  login,
  logout,
  signup,
};
