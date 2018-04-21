const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户数据模式
const UserSchema = new Schema({
  id: String,
  name: String,
  password: String,
  level: Number,
});

// 商品数据模式
const ItemSchema = new Schema({
  name: String,
  owner: String,
  amount: Number,
  price: Number,
  storehouse: String,
  picture: String,
  introduction: String,
  tags: Array,
  isHot: Boolean,
  date: String
});

// 订单数据模式
const OrderSchema = new Schema({
  buyer: String,
  seller: String,
  item: String,
  amount: Number,
  price: Number,
  address: String,
  mobile: String,
  date: String,
  status: Number
});

// 购物车数据模式
const ShopCarSchema = new Schema({
  id: String,
  items: Array
});

//数据模型
const Models = {
  UserModel: mongoose.model('User', UserSchema),
  ItemModel: mongoose.model('Item', ItemSchema),
  OrderModel: mongoose.model('Order', OrderSchema),
  ShopCarModel: mongoose.model('ShopCar', ShopCarSchema),
};

module.exports = Models;