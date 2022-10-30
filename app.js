const express = require("express");

const bodyParser = require("body-parser");
const path = require("path");
const adminData = require("./routes/admin");
const customerRoutes = require("./routes/customer");
const dirName = require("./utils/path");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

//filter using /admin routes
app.use("/admin", adminData.router);

app.use(customerRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res) => {
  res.status(404).sendFile(path.join(dirName, "views", "404NotFound.html"));
});

//const server = http.createServer(app); not required because express creates the server when we call listen method
app.listen(3000);
