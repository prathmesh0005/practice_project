import express from "express";
import {
  getAllUser,
  register,
  userlogin,
  userOrder,
  fetchOrder,
  getUserOrderName,
  updateOrder,
  logOut,
  getUserPrivousOrder,
  deleteOrder,
  fetchUserOrderData
} from "../controller/userController.js";
import { allItems } from "../controller/itemController.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();

router.route("/allUser").get(verifyJWT, getAllUser);

router.post("/register", register);
router.post("/login", userlogin);
router.route("/items").get(verifyJWT, allItems);
router.route("/order").post(verifyJWT, userOrder);
router.route("/allOrder").get(verifyJWT, fetchOrder);
router.route("/userOrderItem").get(verifyJWT, getUserOrderName);
router.route("/update-order").put(verifyJWT, updateOrder);
router.route("/logout").put(verifyJWT, logOut);
router.post("/user-previous-order", getUserPrivousOrder);
router.delete("/delete-order/:id", deleteOrder);
router.post("/user-bill", fetchUserOrderData)

export default router;
