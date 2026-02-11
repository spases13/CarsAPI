const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const { cars } = require("./data/cars");

const app = express();

app.use(cors());

// Ensure all cars have sequential IDs starting from 1
const validateAndEnrichCars = (carsData) => {
  return carsData.map((car, index) => ({
    id: car.id || index + 1,
    ...car,
  }));
};

const enrichedCars = validateAndEnrichCars(cars);

app.get("/api/cars", (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const size = Math.max(parseInt(req.query.size, 10) || 12, 1);
  const query = (req.query.q || "").toString().trim().toLowerCase();

  const filteredCars = query
    ? enrichedCars.filter((car) => {
        const name = car.name.toLowerCase();
        const brand = car.brand.toLowerCase();
        return name.includes(query) || brand.includes(query);
      })
    : enrichedCars;

  const uniqueCars = (() => {
    const seen = new Set();
    return filteredCars.filter((car) => {
      const key = `${car.brand.toLowerCase()}-${car.name.toLowerCase()}`;
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  })();

  const total = uniqueCars.length;
  const start = (page - 1) * size;
  const items = uniqueCars.slice(start, start + size);

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
