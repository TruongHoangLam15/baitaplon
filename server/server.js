// server/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Dùng đường dẫn tuyệt đối để phục vụ assets nằm ngoài folder server
app.use("/assets", express.static(path.join(__dirname, "..", "assets")));

// ==== Kết nối MongoDB ====
mongoose.connect("mongodb://localhost:27017/music_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// ==== Schema và Model ====

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
});

const SongSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  image: String,
  audio: String,  // đường dẫn file audio
  plays: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const ArtistSchema = new mongoose.Schema({
  name: String,
  avatar: String,
  followers: Number,
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
});

const User = mongoose.model("User", UserSchema);
const Song = mongoose.model("Song", SongSchema);
const Artist = mongoose.model("Artist", ArtistSchema);

// ==== Routes ====

// Auth giả lập login
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    // Giả lập, không kiểm tra password
    res.json({ id: user._id, name: user.name, email: user.email, avatar: user.avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy thông tin user và danh sách yêu thích (favorites)
app.get("/api/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Toggle favorite bài hát của user
app.post("/api/users/:id/favorites/toggle", async (req, res) => {
  try {
    const { songId } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const index = user.favorites.indexOf(songId);
    if (index > -1) user.favorites.splice(index, 1);
    else user.favorites.push(songId);

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy tất cả bài hát
app.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy bài hát theo ID
app.get("/api/songs/:id", async (req, res) => {
  try {
    const song = await Song.findById(req.params.id);
    if (!song) return res.status(404).json({ message: "Song not found" });
    res.json(song);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy nghệ sĩ theo tên, kèm bài hát của nghệ sĩ
app.get("/api/artists/:name", async (req, res) => {
  try {
    const artist = await Artist.findOne({ name: req.params.name }).populate("songs");
    if (!artist) return res.status(404).json({ message: "Artist not found" });
    res.json(artist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ====== Các route bổ sung cho home screen ======
app.get("/api/users/:id/favorites", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("favorites");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});
// Lấy danh sách bài hát gợi ý (suggestions) - ví dụ lấy 5 bài hát mới nhất
app.get("/api/suggestions", async (req, res) => {
  try {
    const suggestions = await Song.find().sort({ createdAt: -1 }).limit(5);
    res.json(suggestions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Lấy bảng xếp hạng (charts) - ví dụ lấy 10 bài hát có lượt nghe nhiều nhất
app.get("/api/charts", async (req, res) => {
  try {
    const charts = await Song.find().sort({ plays: -1 }).limit(10);
    res.json(charts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Trending albums - giả lập trả về rỗng hoặc tạo collection Album để mở rộng
app.get("/api/trending-albums", async (req, res) => {
  res.json([]); // tạm thời trả về mảng rỗng
});

// Popular artists - lấy top 10 nghệ sĩ nhiều follower nhất
app.get("/api/popular-artists", async (req, res) => {
  try {
    const artists = await Artist.find().sort({ followers: -1 }).limit(10);
    res.json(artists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ==== Server start ====
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
