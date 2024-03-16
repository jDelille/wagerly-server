// server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/bovada/:matchupId", async (req, res) => {
  try {
    const { matchupId } = req.params;
    console.log(matchupId);
    const response = await axios.get(
      `https://www.bovada.lv/services/sports/event/coupon/events/A/description/basketball/nba/${matchupId}?lang=en`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching NBA games:", error);
    res
      .status(500)
      .json({
        error: "An error occurred while fetching NBA games from the Bovada API",
      });
  }
});

app.get("/nba/schedule", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www.bovada.lv/services/sports/event/coupon/events/A/description/basketball/nba?marketFilterId=def&&eventsLimit=5000&lang=en"
    );
    res.json(response.data[0].events);
  } catch (error) {
    console.error("Error fetching NBA schedule:", error);
    res
      .status(500)
      .json({
        error:
          "An error occurred while fetching NBA schedule from the Bovada API",
      });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
