const mongoose = require("mongoose");
const { Schema } = mongoose;
const userBooking = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    default: "pending",
  },
  BookingNo: { type: [Schema.Types.Mixed], required: true },
});
const virtual = userBooking.virtual("id");
virtual.get(function () {
  return this._id;
});
userBooking.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.userBooking = mongoose.model("userBooking", userBooking);
