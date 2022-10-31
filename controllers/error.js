exports.get404 = (req, res) => {
  res.status(404).render("404NotFound", { pageTitle: "404" });
  //res.status(404).sendFile(path.join(dirName, "views", "404NotFound.html"));
};
