const express = require('express');
const { resolve } = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const Menu = require('./schema.js');

const app = express();
const port = 3010;
const mongoURL = process.env.mongoURI;

app.use(express.static('static'));
app.use(express.json())

mongoose.connect(mongoURL)
.then(() => console.log('Connected to database'))
.catch((err) => console.log('Error connecting to database'))

app.put('/menu/:id', (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;
  Menu.findByIdAndUpdate(id, updatedData)
  .then((updatedItem) => {
    if(!updatedItem){
      return res.status(404).json({ message: 'Menu item not found'})
    }
    res.status(200).json({ message: 'Menu item updated successfully', updatedItem})
  })
  .catch((err) => {
    res.status(500).json({ message: 'An error occured', error:err.message})
  })
})

app.delete('/menu/:id', (req, res) => {
  const id = req.params.id;
  Menu.findByIdAndDelete(id)
  .then((deletedItem) => {
    if(!deletedItem){
      return res.status(404).json({ message: 'Menu item not found'})
    }
    res.status(200).json({ message: 'Menu item deleted successfully', deletedItem})
  })
  .catch((err) => {
    res.status(500).json({ message: 'An error occured'})
  })
})

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
