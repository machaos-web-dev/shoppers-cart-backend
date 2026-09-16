const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed, // whatever payload you send
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);