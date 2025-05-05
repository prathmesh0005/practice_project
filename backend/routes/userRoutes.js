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
  fetchUserOrderData,
  userData,
  giveAdminAccess,
  getUserById,
  removeAdminAccess,
  deleteAllUserOrder,
  deleteParticularUserOrder,
  countUserOrder,
  refreshAccessToken,
  checkAuth,
  changePassword
} from "../controller/userController.js";
import { allItems } from "../controller/itemController.js";
import { verifyJWT } from "../middleware/auth.js";

const router = express.Router();


router.post("/refresh-token", refreshAccessToken)
router.route("/allUser").get(verifyJWT, getAllUser);

router.post("/register", register);
router.post("/login", userlogin);
router.route("/items").get(verifyJWT, allItems);
router.route("/order").post(verifyJWT, userOrder);
router.route("/allOrder").get(verifyJWT, fetchOrder);
router.route("/userOrderItem").get(verifyJWT, getUserOrderName);
router.route("/update-order").put(verifyJWT, updateOrder);
router.route("/logout").put( logOut);
router.post("/user-previous-order", getUserPrivousOrder);
router.delete("/delete-order/:id", deleteOrder);
router.post("/user-bill", fetchUserOrderData);
router.get("/user-data", userData);
router.put("/user-admin-access/:id", giveAdminAccess);
router.get("/get-user/:id", getUserById);
router.put("/remove-admin-access/:id", removeAdminAccess);

router.delete("/delete-user-orders/:id", deleteAllUserOrder);
router.delete("/delete-particular-user-order", deleteParticularUserOrder); // based on selected date
router.get("/order-count/:id", countUserOrder);

router.put("/change-password",changePassword);

router.get("/check",verifyJWT, checkAuth);

export default router;
