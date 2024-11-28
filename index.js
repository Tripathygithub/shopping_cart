const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

let cart = [];

function addNewItem(cart, productId, name, price, quantity) {
  cart.push({
    productId: productId,
    name: name,
    price: price,
    quantity: quantity,
  });
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addNewItem(cart, productId, name, price, quantity);
  res.json({ cartItems: result });
});

function updateQuantityById(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) cart[i].quantity = quantity;
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = updateQuantityById(cart, productId, quantity);
  res.json({ cartItems: result });
});

function deleteItemById(ele, productId) {
  if (ele.productId === productId) return false;
  else return true;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  cart = cart.filter((ele) => deleteItemById(ele, productId));
  res.json({ cartItems: cart });
});

app.get('/cart', (req, res) => {
  res.json({ cartItems: cart });
});

function calculateTotalQuantity(cart) {
  let total_quantity = 0;
  for (let i = 0; i < cart.length; i++) {
    total_quantity += cart[i].quantity;
  }
  return total_quantity;
}
app.get('/cart/total-quantity', (req, res) => {
  let result = calculateTotalQuantity(cart);
  res.json({ totalQuantity: result });
});

function calculateTotalPrice(cart) {
  let total_price = 0;
  for (let i = 0; i < cart.length; i++) {
    total_price += cart[i].price * cart[i].quantity;
  }
  return total_price;
}

app.get('/cart/total-price', (req, res) => {
  let result = calculateTotalPrice(cart);
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
