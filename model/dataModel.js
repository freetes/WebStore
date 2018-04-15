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
  date: Date
});

// 反馈消息模式
const FeedbackSchema = new Schema({
  id: String,
  name: String,
  date: String,
  message: String,
  ip: String
});

//数据模型
const Models = {
  UserModel: mongoose.model('User', UserSchema),
  ItemModel: mongoose.model('Item', ItemSchema),
  FeedbackModel: mongoose.model('Feedback', FeedbackSchema),
};

module.exports = Models;