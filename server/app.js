const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const { json } = require("react-router");

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
// const corsOptions = {
//   origin: "http://localhost:3000",
// };

// const requestEndpoint = "https://www.yellow.ai";

// app.use(cors(corsOptions));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.post("/data", cors(), async (req, res) => {
  const siteUrl = req.body.url;
  console.log(siteUrl, "siteurl");
  var axios = require("axios");

  var config = {
    method: "get",
    url: siteUrl,
  };

  axios(config)
    .then(function (response) {
      let data = response.data;
      console.log(data);
      res.json(data);
    })
    .catch(function (error) {
      console.log(error);
    });

  // try {
  //   const siteUrl = req.body.url;
  //   console.log(siteUrl, "siteurl");
  //   const fetchOptions = {
  //     method: "GET",
  //   };

  //   const response = await fetch(siteUrl, fetchOptions);
  //   console.log(response, "SITE RESPONSE");
  //   const jsonResponse = await response.text();
  //   console.log(jsonResponse, "TEXT DATA");
  //   res.json(jsonResponse);
  // } catch (error) {
  //   console.log(error, "ERROR");
  // }
});

app.get("/", (req, res) => {
  // res.set("Access-Control-Allow-Origin", "*");
  res.send("This has APP 🎈");
});

// app.get("/cors", (req, res) => {
//   // res.set("Access-Control-Allow-Origin", "*");
//   res.send("This has CORS enabled 🎈");
// });

app.listen(port, () => {
  console.log("listening on port " + port);
});
