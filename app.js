const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require("body-parser");
const { error } = require('console');
const getQuotes  = require('./utils/getContentFromUrl');
const NewsController = require('./BL/NewsDataController');
const cors = require("cors");
const UserEventController = require('./BL/UserEventController');
const port = 5000;
// const MongoStore = require("connect-mongo");

// create our Express app
const app = express();
// Enable all CORS requests
app.use(cors());

// serves up static files from the public folder. Anything in public/ will just be served up as the file it is
app.use(express.static(path.join(__dirname, "public")));

// Takes the raw requests and turns them into usable properties on req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get("/", NewsController.serviceStaus);

app.get("/getNews", NewsController.getNews);
app.get("/getNews/:id", NewsController.getNewsById);
app.get("/userHistory/:id", UserEventController.getUserHistory);
app.post("/userEvent", UserEventController.AdduserEvent);

app.get("/test", (req, res) => {
  res.json({
    status: "sucess",
  });
});

mongoose
  .connect(
    "mongodb+srv://ashishgururani8449:MpLrc3dR4PdjcMSs@cluster0.iwxz03v.mongodb.net/",
    {}
  )
  .then(() => {
    console.log("connect to data base");
    app.listen(port, () => {
      console.log("Api is running on port " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
  

  

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });