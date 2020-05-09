// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const shortId = require("shortid");

db = low(adapter);
db.defaults({ books: [] }).write();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Render
app.get("/", (request, response) => {
  response.send("I love CodersX");
});

app.get("/admin-book", (req, res) => {
  res.render("admin-book");
});

app.get("/books/:id/delete", (req, res) => {
  let toDeleteId = req.params.id;
  deleteById(toDeleteId);
  res.redirect("/books");
});

app.get("/books/:id", (req, res) => {
  let itemId = req.params.id;
  let foundItem = findItemById(itemId);
  res.render("book", {
    book: foundItem,
  });
});

app.get("/books", (req, res) => {
  let allItems = db.get("books").value();
  let findName = req.query.q;
  if (!findName) {
    res.render("books", {
      books: allItems,
    });
  } else {
    let foundItems = allItems.filter(function (item) {
      return item.title.toLowerCase().includes(findName);
    });

    res.render("books", {
      books: foundItems,
    });
  }
});

// App logic
app.post("/books/create", (req, res) => {
  addItem(req.body);
  res.redirect("/books");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

// Model function
const addItem = (item) => {
  let newItem = { ...item, id: shortId.generate() };
  !!item && db.get("books").push(newItem).write();
};

const findItemById = (itemId) => {
  return db
    .get("books")
    .find({ id: itemId })
    .value();
};

const deleteById = (itemId) => {
  db.get("books")
    .remove({ id: itemId })
    .write();
};
