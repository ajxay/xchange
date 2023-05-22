import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  picture: {
    type: String,
    default:
      "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png",
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  bio: {
    type: String,
    default: "Xchange user",
  },
  id: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.index({ location: "2dsphere" });

export default mongoose.model("User", userSchema);
