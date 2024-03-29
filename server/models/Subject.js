const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const subjectSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Subject = model('Subject', subjectSchema);

module.exports = Subject;