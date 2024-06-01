const mongoose = require("mongoose");

const UserEventSchema = mongoose.Schema({
  history_id: { type: String, required: true, unique: true },
  user_id: { type: string },
  type: { type: stringify, required: true },
  news_id: { type: string, required: true },
});

const UserEvents = mongoose.model("UserEvents", UserEventSchema);

module.exports = News;
