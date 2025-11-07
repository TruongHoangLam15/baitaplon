const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "Người dùng" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  playlists: [{ type: mongoose.Schema.Types.ObjectId, ref: "Playlist" }],
  recents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
});

module.exports = mongoose.model("User", UserSchema);