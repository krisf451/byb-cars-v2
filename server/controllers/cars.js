import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

import Cars from "../models/cars.js";
import User from "../models/user.js";

// ** GET ALL CARS
export const getAllCars = asyncHandler(async (req, res) => {
  const { page, make, model, color, price, mileage, yearTo, yearFrom, isUsed, sortBy, order } = req.query;

  const sortObj = {};
  const LIMIT = 20;
  let query = { status: { $ne: "sold" } };
  if (make) {
    query = { ...query, make: { $regex: make, $options: "i" } };
  }
  if (model) {
    query = { ...query, model: { $regex: model, $options: "i" } };
  }
  if (color) {
    query = { ...query, color: { $regex: color, $options: "i" } };
  }
  if (price) {
    query = { ...query, price: { $lte: Number(price) } };
  }
  if (mileage) {
    query = { ...query, mileage: { $lte: Number(mileage) } };
  }
  if (yearFrom) {
    query = { ...query, year: { $gte: Number(yearFrom) } };
  }
  if (yearTo) {
    query = { ...query, year: { $lte: Number(yearTo) } };
  }
  if (isUsed) {
    query = { ...query, isUsed: { $eq: isUsed === "false" ? false : true } };
  }

  if (sortBy && order) {
    sortObj[sortBy] = Number(order);
    if (!sortObj["year"]) {
      sortObj["year"] = -1;
    }
    sortObj["createdAt"] = -1;
  } else if (sortBy && !order) {
    sortObj[sortBy] = sortBy === "year" ? -1 : 1;
    if (!sortObj["year"]) {
      sortObj["year"] = -1;
    }
    sortObj["createdAt"] = -1;
  } else {
    sortObj["createdAt"] = -1;
    sortObj["year"] = -1;
  }

  const cars = await Cars.aggregate([
    { $match: query },
    { $sort: sortObj },
    {
      $facet: {
        cars: [{ $skip: (page - 1) * LIMIT }, { $limit: LIMIT }],
        totalCars: [{ $count: "count" }],
      },
    },
  ]);
  if (cars.length > 0) {
    res.status(200).json({
      totalCars: cars[0]?.totalCars[0]?.count || 0,
      numCarsPage: cars[0]?.cars?.length,
      data: cars[0]?.cars,
    });
  } else {
    throw new Error("Something went wrong with getting cars by search term");
  }
});

// ** GET CAR BY ID
export const getCarById = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error(`No car with ID ${req.params.id} found`);
  }
  const car = await Cars.findOne({ _id: req.params.id });
  res.status(200).json({
    success: true,
    data: car,
  });
});

// ** ADD NEW CAR - THIS WILL BE AN AUTH ROUTE, WE CAN GET THE USER_ID FROM THE REQ OBJECT AND ADD IT TO THE NEW CAR OBJECT
export const addCar = asyncHandler(async (req, res) => {
  const { make, model, price, color } = req.body;
  if (!make || !model || !price || !color) {
    res.status(400);
    throw new Error("Please add all fields");
  }
  const carToCreate = {
    ownerId: req.user.id,
    ownerName: req.user.fullName,
    ownerEmail: req.user.email,
    ...req.body,
    image: req.file.path,
  };
  const newCar = await Cars.create(carToCreate);
  if (newCar) {
    res.status(201).json({
      success: true,
      data: newCar,
    });
  } else {
    throw new Error("Error adding car");
  }
});

// ** UPDATE CAR
export const updateCar = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error(`No car with ID ${req.params.id} found`);
  }
  const updatedCar = await Cars.findByIdAndUpdate(req.params.id, req.body, { new: true });

  if (updatedCar) {
    res.status(200).json({
      success: true,
      data: updatedCar,
    });
  } else {
    throw new Error(`Error updating car with ID ${req.params.id}`);
  }
});

// ** DELETE CAR
export const deleteCar = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error(`No car with ID ${req.params.id} found`);
  }
  let deleteCount = await Cars.findByIdAndDelete(req.params.id);
  if (deleteCount) {
    res.status(200).json({
      success: true,
      message: `Car with ID ${req.params.id} deleted`,
    });
  } else {
    throw new Error("Error deleting car");
  }
});

export const getCarColors = asyncHandler(async (req, res) => {
  const colors = await Cars.distinct("color");
  res.status(200).json({
    success: true,
    data: colors,
  });
});

export const getCarMakes = asyncHandler(async (req, res) => {
  const makes = await Cars.distinct("make");
  res.status(200).json({
    success: true,
    data: makes,
  });
});

export const getCarModels = asyncHandler(async (req, res) => {
  const models = await Cars.distinct("model");
  res.status(200).json({
    success: true,
    data: models,
  });
});

export const getCarMakesModels = asyncHandler(async (req, res) => {
  const { make } = req.query;

  const makesModels = await Cars.aggregate([{ $match: { make: { $regex: make, $options: "i" } } }, { $group: { _id: null, model: { $addToSet: "$model" } } }, { $unwind: "$model" }, { $project: { _id: 0 } }]);
  let result = makesModels.map((item) => item.model);
  res.status(200).json({
    success: true,
    numOfModels: result.length,
    data: result,
  });
});

export const getUserCarsForSale = asyncHandler(async (req, res) => {
  const sortObj = { createdAt: -1 };
  const cars = await Cars.aggregate([{ $match: { ownerId: req.user.id, status: { $ne: "sold" } } }, { $sort: sortObj }]);
  if (cars) {
    res.status(200).json(cars);
  } else {
    throw new Error("Something went wrong with getting users cars");
  }
});

export const getSoldCars = asyncHandler(async (req, res) => {
  const sortObj = { createdAt: -1 };
  const cars = await Cars.aggregate([{ $match: { ownerId: req.user.id, status: "sold" } }, { $sort: sortObj }]);
  if (cars) {
    res.status(200).json(cars);
  } else {
    throw new Error("Something went wrong with getting users cars");
  }
});

export const getBoughtCars = asyncHandler(async (req, res) => {
  const sortObj = { createdAt: -1 };
  const cars = await Cars.aggregate([{ $match: { purchasedBy: req.user.id, status: "sold" } }, { $sort: sortObj }]);
  if (cars) {
    res.status(200).json(cars);
  } else {
    throw new Error("Something went wrong with getting users cars");
  }
});

export const toggleFavoriteCar = asyncHandler(async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.body.carId)) {
    throw new Error(`No car with ID ${req.body.carId} found`);
  }
  const user = await User.findOne({ _id: req.user.id });

  if (user.favoriteCars.includes(req.body.carId)) {
    const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, { $pull: { favoriteCars: req.body.carId } }, { new: true });
    if (updatedUser) {
      res.status(200).json({ message: `Car with ID ${req.body.carId} removed from favorites`, data: updatedUser });
    } else {
      throw new Error("Something went wrong with adding car to favorite");
    }
  } else {
    const updatedUser = await User.findOneAndUpdate({ _id: req.user.id }, { $push: { favoriteCars: req.body.carId } }, { new: true });
    if (updatedUser) {
      res.status(200).json({ message: `Car with ID ${req.body.carId} added to favorites`, data: updatedUser });
    } else {
      throw new Error("Something went wrong with adding car to favorite");
    }
  }
});

export const getUserFavoriteCars = asyncHandler(async (req, res) => {
  let user = await User.findById(req.user.id);
  let favoriteCars = await Cars.find({ _id: { $in: user.favoriteCars } });

  if (favoriteCars) {
    res.status(200).json(favoriteCars);
  } else {
    throw new Error("Something went wrong with adding car to favorite");
  }
});
