exports.getCurrent = (req, res, next) => {
  res.render("weather/current-conditions", {
    pageTitle: "Weather"
  });
};
