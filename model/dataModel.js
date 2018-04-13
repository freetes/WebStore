const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// 用户数据模式
const UserSchema = new Schema({
  id: String,
  name: String,
  password: String,
  level: Number,
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
  FeedbackModel: mongoose.model('Feedback', FeedbackSchema),
};

module.exports = Models;