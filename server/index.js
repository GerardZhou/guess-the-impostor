require("dotenv").config();
const express = require("express");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const API_KEY = process.env.API_KEY;
const API_URL = process.env.API_URL;

app.get("/api/celebrities", async (req, res) => {
  try {
    const { name } = req.query; // Get name from query params
    if (!name) {
      return res
        .status(400)
        .json({ error: "Name query parameter is required" });
    }

    const response = await axios.get(
      `${API_URL}?name=${encodeURIComponent(name)}`,
      {
        headers: { "X-Api-Key": API_KEY }, // API-Ninjas requires this header
      }
    );

    res.json(response.data); // Send the response to frontend
  } catch (error) {
    console.error(
      "Error fetching celebrity data:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch celebrity data" });
  }
});

app.get("/api/random-celebrity", async (req, res) => {
  try {
    // Use a random letter to get random celebrities
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = letters[Math.floor(Math.random() * letters.length)];

    const response = await axios.get(`${API_URL}?name=${randomLetter}`, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (response.data.length === 0) {
      return res.status(404).json({ error: "No celebrity found" });
    }

    const randomCelebrity =
      response.data[Math.floor(Math.random() * response.data.length)];
    res.json(randomCelebrity);
  } catch (error) {
    console.error(
      "Error fetching celebrity data:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch celebrity data" });
  }
});

app.get("/", (req, res) => {
  res.send("Hi from backend");
});

app.listen(8080, () => {
  console.log("server running");
});
