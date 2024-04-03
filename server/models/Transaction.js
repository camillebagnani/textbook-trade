const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const transactionSchema = new Schema({
    purchaseDate: {
      type: Date,
      default: Date.now
    },
    sellerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    buyerId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    book: {
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }
  });
  
  const Transaction = model('Transaction', transactionSchema);
  
  module.exports = Transaction;