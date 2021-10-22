const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  // 這邊定義 mongo db 內的資料結構
  // 參照 restaurant.json
  name: String,
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: 'true',
    required: true
  }
});

module.exports = mongoose.model('Shop', shopSchema);