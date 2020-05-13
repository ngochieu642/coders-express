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
    renderAllItems("users", req, res);
  },
  getCreate: (req, res) => {
    res.render("admin-user");
  },
  getItemById: (req, res) => {
    let itemId = req.params.id;
    let foundItem = findItemById("users", itemId);
    res.render("user", {
      user: foundItem,
    });
  },
  getDeleteById: (req, res) => {
    let toDeleteId = req.params.id;
    deleteById("users", toDeleteId);
    res.redirect("/users");
  },
  postUpdateById: (req, res) => {
    let toUpdateId = req.params.id;
    updateItemById("users", toUpdateId, req.body);
    res.redirect("/users");
  },
  postCreate: (req, res) => {
    addItem("users", req.body);
    res.redirect("/users");
  },
};
