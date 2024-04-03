const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  // books: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Books'
  //   }
  // ]
});

const Subject = model('Subject', subjectSchema);

module.exports = Subject;