const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const bookSchema = new Schema({
  title: {
    type: String,
    //required: true,
    default: "",
  },
  authors: {
    type: String,
    default: "",
  },
  subject: {
    type: Schema.Types.ObjectId,
    ref: "subject",
    //required: true,
    default: "",
  },
  isbn: {
    type: String,
    //required: true,
    default: "",
  },
  image: {
    type: String,
    default: "/textbook-icon.png",
  },
  price: {
    type: Number,
    // required: true,
    default: "",
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

const Book = model("book", bookSchema);

module.exports = Book;
