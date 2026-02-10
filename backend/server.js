const express = require("express");
const cors = require("cors");
const { cars } = require("./data/cars");

const app = express();

app.use(cors());

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
