import mongoose from "mongoose";

const carsSchema = mongoose.Schema(
  {
    ownerId: { type: String, required: true },
    ownerName: { type: String },
    ownerEmail: { type: String },
    make: { type: String },
    model: { type: String },
    price: { type: Number },
    color: { type: String },
    mileage: { type: Number },
    year: { type: Number },
    isUsed: { type: Boolean },
    image: { type: String },
    description: { type: String },
    status: { type: String },
    purchasedBy: { type: String },
    // features: { type: Object },
  },
  { timestamps: true }
);

const Cars = mongoose.model("Cars", carsSchema);

export default Cars;
