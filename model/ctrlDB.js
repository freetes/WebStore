const Models = require('../model/dataModel');

const ctrlDB = {
  // 获取所有热门商品信息
  getAllItemInfo: async ()=>{
    return {
      items: await Models.ItemModel.find()
    }
  },
  getAllInfo: async ()=>{
    return {
      items: await Models.ItemModel.find(),
      users: await Models.UserModel.find({level: { $ne:2}})
    }
  }
};

module.exports = ctrlDB;
