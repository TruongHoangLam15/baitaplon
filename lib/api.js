// lib/api.js
export const BASE_URL = "http://localhost:5000/api"; 

// ===================== AUTH =====================
export async function signup(name, email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, avatar: "default.png" }),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Signup failed: ${errText}`);
    }
    return await res.json();
  } catch (err) {
    console.log("Signup error:", err);
    throw err;
  }
}

export async function login(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`Login failed: ${errText}`);
    }
    return await res.json();
  } catch (err) {
    console.log("Login error:", err);
    throw err;
  }
}

// ===================== SONGS =====================
export async function getSongs() {
  try {
    const res = await fetch(`${BASE_URL}/songs`);
    if (!res.ok) throw new Error("Failed to fetch songs");
    return await res.json();
  } catch (err) {
    console.log("getSongs error:", err);
    return [];
  }
}

export async function getSongById(id) {
  try {
    const res = await fetch(`${BASE_URL}/songs/${id}`);
    if (!res.ok) throw new Error("Song not found");
    return await res.json();
  } catch (err) {
    console.log("getSongById error:", err);
    return null;
  }
}

// ===================== USERS & FAVORITES =====================
export async function getUserById(userId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}`);
    if (!res.ok) throw new Error("User not found");
    return await res.json();
  } catch (err) {
    console.log("getUserById error:", err);
    return null;
  }
}

export async function getUserFavorites(userId) {
  try {
    const user = await getUserById(userId);
    return user?.favorites || [];
  } catch (err) {
    console.log("getUserFavorites error:", err);
    return [];
  }
}

export async function toggleFavorite(userId, songId) {
  try {
    const res = await fetch(`${BASE_URL}/users/${userId}/favorites/toggle`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ songId }),
    });
    if (!res.ok) throw new Error("Failed to toggle favorite");
    return await res.json();
  } catch (err) {
    console.log("toggleFavorite error:", err);
    return [];
  }
}

// ===================== ARTISTS =====================
export async function getPopularArtists() {
  try {
    const res = await fetch(`${BASE_URL}/popular-artists`);
    if (!res.ok) throw new Error("Failed to fetch popular artists");
    return await res.json();
  } catch (err) {
    console.log("getPopularArtists error:", err);
    return [];
  }
}


export async function getArtistByName(name) {
  try {
    const res = await fetch(`${BASE_URL}/artists/${encodeURIComponent(name)}`);
    if (!res.ok) throw new Error("Artist not found");
    return await res.json();
  } catch (err) {
    console.log("getArtistByName error:", err);
    return null;
  }
}

// ===================== OTHER DATA (CHARTS, ALBUMS, SUGGESTIONS) =====================
export async function getCharts() {
  try {
    const res = await fetch(`${BASE_URL}/charts`);
    if (!res.ok) throw new Error("Failed to fetch charts");
    return await res.json();
  } catch (err) {
    console.log("getCharts error:", err);
    return [];
  }
}

export async function getTrendingAlbums() {
  try {
    const res = await fetch(`${BASE_URL}/trending-albums`);
    if (!res.ok) throw new Error("Failed to fetch trending albums");
    return await res.json();
  } catch (err) {
    console.log("getTrendingAlbums error:", err);
    return [];
  }
}

export async function getSuggestions() {
  try {
    const res = await fetch(`${BASE_URL}/suggestions`);
    if (!res.ok) throw new Error("Failed to fetch suggestions");
    return await res.json();
  } catch (err) {
    console.log("getSuggestions error:", err);
    return [];
  }
}
