exports.getCurrent = (req, res, next) => {
  res.render("weather/index", {
    pageTitle: "Weather"
  });
};
