import express from "express";
import {
  createFoodController,
  deleteFoodController,
  getFoodbyIdController,
  getFoodbyRestuarantController,
  getallFoodController,
  orderStatusController,
  placeOrderController,
  updateFoodController,
} from "../controllers/foodController.js";
import adminMiddlware from "../middleware/adminMidlleware.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Food
router.post("/create", createFoodController);

//Get All Foods
router.get("/getall", getallFoodController);

//get Food By ID
router.get("/getone/:id", getFoodbyIdController);

//get Food By Resturant
router.get("/getbyrest/:id", getFoodbyRestuarantController);

//Update Food
router.put("/update/:id", updateFoodController);

//Delete Food
router.delete("/delete/:id", deleteFoodController);

//Place Order (requires auth to set req.body.id)
router.post('/placeorder', authMiddleware, placeOrderController)

//ORDER Status (auth + admin)
router.post('/orderstatus/:id', authMiddleware, adminMiddlware, orderStatusController)
export default router;
