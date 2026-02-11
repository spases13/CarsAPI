const baseCars = require("./baseCars.json");

const cars = Array.from({ length: 50 }, (_, index) => {
  const car = baseCars[index % baseCars.length];

  return {
    id: index + 1,
    ...car,
    year: 2015 + (index % 10),
    pricePerDay: 60 + (index % 12) * 7,
    rating: 4.1 + (index % 7) * 0.1,
  };
});

module.exports = { cars };
