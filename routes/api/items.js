const express = require("express");
const router = express.Router();

const Item = require("../../models/Item");

// @route GET api/items
// @desc Get All Items
// @access Public

router.get("/", (req, res) => {
  console.log('all Items ', req.body, req.params)
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// @route POST api/items
// @desc Create an Item
// @access Public

router.post("/", (req, res) => {
  console.log('add Items ', req.body, req.params)
  const newItem = new Item({
    name: req.body.name
  });

  newItem.save().then(item => res.json(item));
});

// @route DELETE api/items
// @desc Delete an Item
// @access Public

router.delete("/:id", (req, res) => {
  console.log('delete Items ', req.body, req.params)
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

// @route UPDATE api/items
// @desc Update an Item
// @access Public

router.post("/:id", (req, res) => {
  console.log('edit Items ', req.body, req.params)
  Item.findById(req.params.id)
    .then(item => { 
      item.name = req.body.name;
      item.save().then(() => res.json({ success: true }))
    })
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
