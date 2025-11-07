const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  image: String,
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
