// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const FileSync = require("lowdb/adapters/FileSync");

const userRoutes = require("./routes/users");
const bookRoutes = require("./routes/books");
const transactionRoutes = require("./routes/transaction");

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/transactions", transactionRoutes);

// Render
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});
