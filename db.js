const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const shortId = require("shortid");

const db = low(adapter);
db.defaults({ books: [], users: [] }).write();

// Model function
db.addItem = (model, content) => {
  let newItem = { ...content, id: shortId.generate() };
  if (!!model && !!content) {
    db.get(model).push(newItem).write();
  }
};

db.findItemById = (modelName, itemId) => {
  return db.get(modelName).find({ id: itemId }).value();
};

db.deleteById = (modelName, itemId) => {
  db.get(modelName).remove({ id: itemId }).write();
};

db.updateItemById = (modelName, itemId, content) => {
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

db.renderAllItems = (modelName, req, res) => {
  let allItems = db.get(modelName).value();
  let findName = req.query.q;
  if (!findName) {
    res.render(modelName, {
      [modelName]: allItems,
    });
  } else {
    let foundItems = allItems.filter(function (item) {
      switch (modelName) {
        case "books":
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

module.exports = db;
