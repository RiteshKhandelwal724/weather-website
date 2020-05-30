const express = require("express");
const weather = require("./weather");
const path = require("path");
const hbs = require("hbs");
const app = express();
const publicDir = path.join(__dirname, "../public");
const viewsDir = path.join(__dirname, "../template/views");
const partialsDir = path.join(__dirname, "../template/partials");
const port=process.env.PORT||3000
app.set("view engine", "hbs");
app.set("views", viewsDir);
hbs.registerPartials(partialsDir);
app.use(express.static(publicDir));
app.get("", (req, res) => {
  res.render("index", {
    name: "Ritesh",
    title: "Weather",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Ritesh",
    title: "Help ",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address)
    return res.send({ error: "Please enter the address" });
  weather.geoCode(req.query.address, (error, { long, lat, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    weather.weatherReport(long, lat, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      res.send( {
        forecastData: data,
        location: location,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    name: "Ritesh",
    title: "404 help page not found ",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    name: "Ritesh",
    title: "About ",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404 Page not found",
  });
});
app.listen(port, () => {
  console.log("Hey ,this has started");
});
