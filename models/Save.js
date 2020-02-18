var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SaveSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary:{
      type: String,
      required: true
  },
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

// mongoose model method
var Save = mongoose.model("Saved", SaveSchema);

// Export the Save model
module.exports = Save;