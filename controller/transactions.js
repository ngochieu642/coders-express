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
    renderAllItems("transactions", req, res);
  },
  getCreate: (req, res) => {
    res.render("admin-transaction", {
      books: db.get("books").value(),
      users: db.get("users").value(),
    });
  },
  getItemById: (req, res) => {
    let itemId = req.params.id;
    let foundItem = findItemById("transactions", itemId);
    res.render("transaction", {
      transaction: foundItem,
    });
  },
  getDeleteById: (req, res) => {
    let toDeleteId = req.params.id;
    deleteById("transactions", toDeleteId);
    res.redirect("/transactions");
  },
  postUpdateById: (req, res) => {
    let toUpdateId = req.params.id;
    updateItemById("transactions", toUpdateId, req.body);
    res.redirect("/transactions");
  },
  postCreate: (req, res) => {
    addItem("transactions", {...req.body, isComplete: false});
    res.redirect("/transactions");
  },
  getCompleteById: (req, res) => {
    let toUpdateId = req.params.id;
    db.get("transactions").find({ id: toUpdateId }).assign({ isComplete: true }).write();
    res.redirect("/transactions");
  }
};
