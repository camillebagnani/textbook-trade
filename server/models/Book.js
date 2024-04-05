const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    //required: true,
  },
  authors: [
    {
      type: String,
    },
  ],
  subject: {
    type: Schema.Types.ObjectId,
    ref: 'subject',
    //required: true
  },
  isbn: {
    type: String,
    //required: true,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  price: {
    type: Number,
   // required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  sold: {
    type: Boolean,
    default: false,
  },
});

const Book = model('book', bookSchema)

module.exports = Book;
