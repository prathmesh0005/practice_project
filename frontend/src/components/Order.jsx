import { useEffect, useState } from "react";
// import UserOrder from "./UserOrder";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/api/user/order";
const itemUrl = "http://localhost:3000/api/user/items";
const updateURL = `http://localhost:3000/api/user/update-order`;

// eslint-disable-next-line react/prop-types
export default function Order({ userOrderInfo, refreshOrderData }) {
  const [items, setItems] = useState([]); //all product
  const [order, setOrder] = useState(); //store item id
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  // eslint-disable-next-line react/prop-types
  const orderId = userOrderInfo?.orderId;
  const deleteURL = `http://localhost:3000/api/user/delete-order/${orderId}`;

  useEffect(() => {
    async function fetchItem() {
      const response = await axios.get(itemUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setItems(response.data.items);
    }
    fetchItem();
  }, []);

  const requestData = {
    user_id: user.id,
    items_id: order,
  };

  const handleOrder = async (e) => {
    try {
      e.preventDefault();
      await axios.post(URL, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      refreshOrderData();
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateUserOrder = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        id: orderId,
        itemId: order,
      };
      await axios.put(updateURL, updateData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      refreshOrderData();
      localStorage.setItem("updatedOrder", JSON.stringify(order));
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.log("Error Response:", error.response.data);
      } else {
        console.log("Error Message:", error.message);
      }
    }
  };

  const handleDeleteOrder = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(deleteURL);
      console.log(res.data);
      refreshOrderData();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!userOrderInfo ? (
        <div className="container d-flex mt-4 justify-content-center align-items-center">
          <div
            className="card p-4 shadow-lg border-dark text-black"
            style={{
              width: "330px",
              background: "transparent",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <h5 className="text-center mb-4">What&apos;s Your Flavor? ☕ </h5>
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
                      <label className="px-2">
                        <b>{item.name}</b>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="container justify-content-center align-items-center">
                  <div className="d-flex align-items-center justify-content-center ms-auto">
                    <button
                      type="submit"
                      onClick={handleOrder}
                      className=" btn border border-dark me-2 mb-3"
                      style={{
                        color: "white",
                        background: "black",
                        width: "50%",
                      }}
                    >
                      Order Now
                    </button>
                    <button
                      type="submit"
                      onClick={handleDeleteOrder}
                      className=" btn border border-dark me-2 mb-3"
                      style={{
                        color: "white",
                        background: "black",
                        width: "50%",
                      }}
                    >
                      Cancle Order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid">
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
                          <label className="px-2">
                            <b>{item.name}</b>
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex align-items-center justify-content-center ms-auto">
                      <button
                        type="submit"
                        onClick={updateUserOrder}
                        className=" btn border border-dark me-2 mb-3"
                        style={{ color: "white", background: "black" }}
                      >
                        Update Order
                      </button>
                      <button
                        type="submit"
                        onClick={handleDeleteOrder}
                        className=" btn border border-dark me-2 mb-3"
                        style={{
                          color: "white",
                          background: "black",
                          width: "50%",
                        }}
                      >
                        Cancle Order
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
