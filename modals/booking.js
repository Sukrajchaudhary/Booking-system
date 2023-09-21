const mongoose = require("mongoose");
const { Schema } = mongoose;
const bookingSchema = new Schema({
  BookingNo: {
    type: Number,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    default: "enabled",
  },
});
const virtual = bookingSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
bookingSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Booking = mongoose.model("Booking", bookingSchema);
