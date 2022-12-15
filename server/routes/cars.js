import express from "express";
import multer from "multer";

const Storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, req.user.id + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: Storage });

import { addCar, deleteCar, updateCar, getCarById, getAllCars, getCarColors, getCarMakes, getCarModels, getUserCarsForSale, getCarMakesModels, getSoldCars, getBoughtCars, toggleFavoriteCar, getUserFavoriteCars } from "../controllers/cars.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.put("/users/favorite", auth, toggleFavoriteCar);
router.get("/users/getFavorites", auth, getUserFavoriteCars);
router.get("/users/bought", auth, getBoughtCars);
router.get("/users/sold", auth, getSoldCars);
router.get("/users", auth, getUserCarsForSale);
router.get("/colors", getCarColors);
router.get("/models", getCarModels);
router.get("/makes", getCarMakes);
router.get("/makes-models", getCarMakesModels);
router.route("/").get(getAllCars).post(auth, upload.single("image"), addCar);
router.route("/:id").get(getCarById).put(auth, upload.single("image"), updateCar).delete(deleteCar);

export default router;
