import axios from "axios";
import Order from "./Order";
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance.js"

const URL = `http://localhost:3000/api/user/user-previous-order`;

export default function Dashboard() {
  const [message, setMessage] = useState("");
  const [userOrderInfo, setuserOrderInfo] = useState(null); //get user order
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const date = new Date();
    const time = Number(date.getHours());

    if (time >= 5 && time < 12) {
      setMessage("Good Morning");
    } else if (time >= 12 && time < 18) {
      setMessage("Good Afternoon");
    } else {
      console.log("Good Evening");
    }
  }, [userOrderInfo]);

  const fetchUserPreviousOrder = async () => {
    try {
      const reqData = { userId: user.id };
      const res = await api.post(URL, reqData);
      setuserOrderInfo(res.data.result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUserPreviousOrder();
  }, []);

  return (
    <>
      <div className="container-fluid login-bg-container ">
        <div className="container justify-content-center align-self-start mt-5 ">
          <div
            className="card border-0 p-1 m-4 d-flex justify-content-center align-items-center align-self-start mt-5 "
            style={{ background: "transparent" }}
          >
            <h3 className="text-black shadow-lg-info">
              {message} {user.firstName}
            </h3>
          </div>

          <Order
            userOrderInfo={userOrderInfo}
            refreshOrderData={fetchUserPreviousOrder}
          />

          {userOrderInfo && (
            <div className="container d-flex mt-4 justify-content-center align-item-center">
              <div
                className="card p-4 shadow-lg "
                style={{ width: "250px", background: "#eae9e7" }}
              >
                <h5 className="text-center mb-4">Your order is</h5>
                <div className="shadow-lg bg-warning p-2 h5 text-center rounded m-auto">
                  {userOrderInfo.orderName}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
