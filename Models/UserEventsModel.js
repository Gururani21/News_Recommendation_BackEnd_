const mongoose = require("mongoose");

const UserEventSchema = mongoose.Schema({
  user_id: { type: String },
  type: { type: String, required: true },
  news_id: { type: String, required: true },
});

const UserEvents = mongoose.model("UserEvents", UserEventSchema);

module.exports = UserEvents;
