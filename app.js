const http = require("http");

const express = require("express");

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const customerRoutes = require("./routes/customer");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRoutes);

app.use(customerRoutes);
//const server = http.createServer(app); not required because express creates the server when we call listen method

app.listen(3000);
