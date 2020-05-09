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

const db = low(adapter);
db.defaults({ books: [], users: [] }).write();

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

app.get("/books/:id", (req, res) => {
  let itemId = req.params.id;
  let foundItem = findItemById("books", itemId);
  res.render("book", {
    book: foundItem,
  });
});

app.get("/books", (req, res) => {
  renderAllItems("books", req, res);
});

app.get("/admin-user", (req, res) => {
  res.render("admin-user");
});

app.get("/users/:id", (req, res) => {
  let itemId = req.params.id;
  let foundItem = findItemById("users", itemId);
  res.render("user", {
    user: foundItem,
  });
});

app.get("/users", (req, res) => {
  renderAllItems("users", req, res);
});

// App logic users
app.get("/users/:id/delete", (req, res) => {
  let toDeleteId = req.params.id;
  deleteById("users", toDeleteId);
  res.redirect("/users");
});

app.post("/users/:id/update", (req, res) => {
  let toUpdateId = req.params.id;
  updateItemById("users", toUpdateId, req.body);
  res.redirect("/users");
});

app.post("/users/create", (req, res) => {
  addItem("users", req.body);
  res.redirect("/users");
});

// App logic books
app.get("/books/:id/delete", (req, res) => {
  let toDeleteId = req.params.id;
  deleteById("books", toDeleteId);
  res.redirect("/books");
});

app.post("/books/:id/update", (req, res) => {
  let toUpdateId = req.params.id;
  updateItemById("books", toUpdateId, req.body);
  res.redirect("/books");
});

app.post("/books/create", (req, res) => {
  addItem("books", req.body);
  res.redirect("/books");
});

// listen for requests :)
app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT);
});

// Model function
const addItem = (model, content) => {
  let newItem = { ...content, id: shortId.generate() };
  if (!!model && !!content) {
    db.get(model).push(newItem).write();
  }
};

const findItemById = (modelName, itemId) => {
  return db.get(modelName).find({ id: itemId }).value();
};

const deleteById = (modelName, itemId) => {
  db.get(modelName).remove({ id: itemId }).write();
};

const updateItemById = (modelName, itemId, content) => {
  switch (modelName) {
    case "books":
      let { title } = content;
      db.get(modelName).find({ id: itemId }).assign({ title: title }).write();
      break;
    case "users":
      let { name } = content;
      db.get(modelName).find({ id: itemId }).assign({ name: name }).write();
      break;
  }
};

const renderAllItems = (modelName, req, res) => {
  let allItems = db.get(modelName).value();
  let findName = req.query.q;
  if (!findName) {
    res.render(modelName, {
      [modelName]: allItems,
    });
  } else {
    let foundItems = allItems.filter(function (item) {
      switch (modelName) {
        case "book":
          return item.title.toLowerCase().includes(findName);
          break;
        case "users":
          return item.name.toLowerCase().includes(findName);
          break;
      }
    });

    res.render(modelName, {
      [modelName]: foundItems,
    });
  }
};
