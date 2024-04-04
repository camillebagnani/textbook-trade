const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const transactionSchema = new Schema({
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: "user"
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'book'
    }
  });
  
  const Transaction = model('transaction', transactionSchema);
  
  module.exports = Transaction;