import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3001;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  let activity_type = req.body.type
  let people = req.body.participants
  console.log(people);
  try {
    const response = await axios.get(`https://bored-api.appbrewery.com/filter?type=${activity_type}&participants=${people}`);
    const result = response.data;
    let random_elem = Math.floor(Math.random() * result.length)
    
    res.render("index.ejs", { data: result[random_elem] });
  } catch (error) {
    console.error("Failed to make request:", error);
    res.render("index.ejs", {
      error: "No activities that match your criteria.",
    });
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
