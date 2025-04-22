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
  userData ,
  giveAdminAccess,
  getUserById,
  removeAdminAccess
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
router.get("/user-data",userData )
router.put("/user-admin-access/:id",giveAdminAccess)
router.get("/get-user/:id",getUserById)
router.put("/remove-admin-access/:id",removeAdminAccess)

export default router;
