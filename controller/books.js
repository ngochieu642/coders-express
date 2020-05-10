const db = require("../db");
const {
  findItemById,
  renderAllItems,
  deleteById,
  updateItemById,
  addItem,
} = db;

module.exports = {
  root: (req, res) => {
    renderAllItems("books", req, res);
  },
  getCreate: (req, res) => {
    res.render("admin-book");
  },
  getItemById: (req, res) => {
    let itemId = req.params.id;
    let foundItem = findItemById("books", itemId);
    res.render("book", {
      book: foundItem,
    });
  },
  getDeleteById: (req, res) => {
    let toDeleteId = req.params.id;
    deleteById("books", toDeleteId);
    res.redirect("/books");
  },
  postUpdateById: (req, res) => {
    let toUpdateId = req.params.id;
    updateItemById("books", toUpdateId, req.body);
    res.redirect("/books");
  },
  postCreate: (req, res) => {
    addItem("books", req.body);
    res.redirect("/books");
  },
};
