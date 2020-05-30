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
    let allItems = db.get("transactions").value();
    let filteredItems;

    if (req.signedCookies.userId) {
      let user = db.get("users").find({ id: req.signedCookies.userId }).value();
      if (user.isAdmin) {
        filteredItems = allItems;
      } else {
        filteredItems = allItems.filter((x) => {
          return x.userId === user.id;
        });
      }
    }

    res.render("transactions", {
      transactions: filteredItems,
    });
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
    addItem("transactions", { ...req.body, isComplete: false });
    res.redirect("/transactions");
  },
  getCompleteById: (req, res) => {
    let errs = [];
    let toUpdateId = req.params.id;
    let foundItem = db.get("transactions").find({ id: toUpdateId }).value();

    let modelName = "transactions";
    let allItems = db.get(modelName).value();

    if (!foundItem) {
      errs.push("ID not found");
    }

    if (errs.length) {
      res.render("transactions", {
        errors: errs,
        transactions: allItems,
      });
      return;
    }

    db.get("transactions")
      .find({ id: toUpdateId })
      .assign({ isComplete: true })
      .write();
    res.redirect("/transactions");
  },
};
