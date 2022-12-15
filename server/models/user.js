import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteCars: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cars" }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
