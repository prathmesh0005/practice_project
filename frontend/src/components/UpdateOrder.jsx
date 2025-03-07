import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const URL = `http://localhost:3000/api/user/update-order`;

export default function UpdateOrder() {
  const [order, setOrder] = useState(); //store item id

  const location = useLocation();
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const { items, userOrder ,userOrderInfo } = location.state || {};

  const requestData = {
    id: userOrder || userOrderInfo.orderId,
    itemId: order,
  };

  const updateOrder = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(URL, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.setItem("updatedOrder", JSON.stringify(order));
      console.log(response.data);
      navigate("/dashboard");
      //console.log("Order Set:", userOrder);
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response.data);
      } else {
        console.log("Error Message:", error.message);
      }
    }
  };

  return (
    <>
      <div className="container-fluid login-bg-container">
        <div className="container  justify-content-center align-self-start mt-5">
          <div className="container d-flex mt-4 justify-content-center align-item-center">
            <div
              className="card p-4 shadow-lg border-dark text-black"
              style={{
                width: "330px",
                background: "transparent",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(10px)",
              }}
            >
              <h5 className="text-center mb-4">Update Your Order</h5>
              <div className="form">
                <form action="">
                  <div className="mb-3">
                    {items.map((item) => (
                      <div key={item.id}>
                        <input
                          className="text-black"
                          type="radio"
                          onChange={(e) => setOrder(e.target.value)}
                          name="order_item"
                          value={item.id}
                        />
                        <label className="px-2"><b>{item.name}</b></label>
                      </div>
                    ))}
                  </div>
                  <div className="d-flex align-items-center justify-content-center ms-auto">
                    <button
                      type="submit"
                      onClick={updateOrder}
                      className=" btn border border-dark me-2 mb-3"
                      style={{color:"white", background:"black"}}
                    >
                      Update Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
