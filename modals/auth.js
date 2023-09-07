const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: Buffer,
    required: true,
  },
  email: { type: String, required: true, unique: true },
  PhoneNo: {
    type: [Schema.Types.Mixed],
    default: null,
  },
  salt: {
    type: Buffer,
  },
  role:{
    type:String
  },
  token:{
    type:Buffer
  }
});
const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});
userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.User = mongoose.model("User", userSchema);
