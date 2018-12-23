const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

const items = require("./routes/api/items");

const app = express();
app.use(cors());

app.use(bodyParser.json());

const db = require("./config").mongoURI;

  mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Mongodb connected"))
  .catch(err => console.log(err));

  app.use(express.static('public'));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname,'public','build','index.html'))
})

app.use("/api/items", items);

const PORT = require("./config").PORT;

app.listen(PORT, () => console.log(`started on ${PORT}`));
