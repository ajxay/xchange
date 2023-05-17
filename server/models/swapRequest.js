import mongoose from "mongoose";

const swapRequestSchema = mongoose.Schema({
  book: { type: String, required: true },
  bookName: { type: String, required: true },
  sender: { type: String, required: true },
  senderName: { type: String, required: true },
  receiver: { type: String, required: true },
  options: { type: [String], required: true },
  status: { type: String, default: "pending" },
  opted: { type: String },
});
// postSchema.index({ location: "2dsphere" });

const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
export default SwapRequest;
