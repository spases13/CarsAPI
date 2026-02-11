const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { cars } = require("./data/cars");

const app = express();

app.use(cors());

app.set("trust proxy", 1);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

app.use("/api", apiLimiter);

app.get("/api/cars", (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const size = Math.max(parseInt(req.query.size, 10) || 12, 1);
  const query = (req.query.q || "").toString().trim().toLowerCase();

  const filteredCars = query
    ? cars.filter((car) => {
        const name = car.name.toLowerCase();
        const brand = car.brand.toLowerCase();
        return name.includes(query) || brand.includes(query);
      })
    : cars;

  const total = filteredCars.length;
  const start = (page - 1) * size;
  const items = filteredCars.slice(start, start + size);

  res.json({
    page,
    size,
    total,
    items,
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Cars API listening on http://localhost:${PORT}`);
});
