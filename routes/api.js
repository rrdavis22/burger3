const express = require("express");
const router = express.Router();
const db = require("../config/connection.js");
const Burger = require("../models/Burger.js");

router.get("/burgers", (req, res) =>
  Burger.findAll()
    .then(burgers => {
      res.send(burgers);
    })
    .catch(err => console.log(err))
);

router.post("/add", (req, res) => {
  Burger.create({
    name: req.body.name
  })
    .then(burgers => {
      res.send(burgers);
    })
    .catch(err => console.log(err));
});

router.post("/update/:id", (req, res) => {
  const burgerId = req.params.id;
  console.log(burgerId);
  Burger.update(
    {
      devoured: true
    },
    {
      where: {
        id: burgerId
      }
    }
  );
  res.json(burgerId);
});

router.post("/destroy/:id", (req, res) => {
  const burgerId = req.params.id;
  console.log(burgerId);
  Burger.destroy({
    where: {
      id: burgerId
    }
  });
  res.json(burgerId);
});

module.exports = router;
