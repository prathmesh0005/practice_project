import { useEffect, useState } from "react";
import UserOrder from "./UserOrder";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "http://localhost:3000/api/user/order";
const itemUrl = "http://localhost:3000/api/user/items";

export default function Order({ userOrderInfo }) {
  const [items, setItems] = useState([]); //all product
  const [order, setOrder] = useState(); //store item id
  const [userOrder, setUserOrder] = useState(null); //order id
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

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
      const response = await axios.post(URL, requestData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //console.log(response.data);
      setUserOrder(Number(response.data.order.id));
      //console.log("Order Set:", userOrder);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateOrder = (e) => {
    e.preventDefault();
    navigate("/update", { state: { items, userOrder, userOrderInfo } });
  };

  // useEffect(() => {
  //     if (userOrder !== null) {
  //         console.log("Updated User Order:", userOrder);
  //     }
  // }, [userOrder]);

  return (
    // <>
    //   <div className="container d-flex mt-4 justify-content-center align-items-center">
    //     <div
    //       className="card p-4 shadow-lg border-dark text-black"
    //       style={{
    //         width: "330px",
    //         background: "transparent",
    //         backdropFilter: "blur(4px)",
    //         WebkitBackdropFilter: "blur(10px)",
    //       }}
    //     >
    //       <h5 className="text-center mb-4">What you want now</h5>
    //       <div className="form">
    //         <form action="">
    //           <div className="mb-3">
    //             {items.map((item) => (
    //               <div key={item.id}>
    //                 <input
    //                   className="text-black"
    //                   type="radio"
    //                   onChange={(e) => setOrder(e.target.value)}
    //                   name="order_item"
    //                   value={item.id}
    //                 />
    //                 <label className="px-2">
    //                   <b>{item.name}</b>
    //                 </label>
    //               </div>
    //             ))}
    //           </div>

    //           <div className="container justify-content-center align-items-center">
    //             <div className="d-flex align-items-center justify-content-center ms-auto">
    //               <button
    //                 type="submit"
    //                 onClick={handleOrder}
    //                 className=" btn border border-dark me-2 mb-3"
    //                 style={{
    //                   color: "white",
    //                   background: "black",
    //                   width: "50%",
    //                 }}
    //               >
    //                 Order Now
    //               </button>
    //             </div>

    //             <div className="d-flex align-items-center justify-content-center ms-auto">
    //               <button
    //                 type="submit"
    //                 onClick={updateOrder}
    //                 className="btn border border-dark me-2"
    //                 style={{
    //                   color: "white",
    //                   background: "black",
    //                   width: "50%",
    //                 }}
    //               >
    //                 Update Order
    //               </button>
    //             </div>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>

    //   {userOrder && <UserOrder userOrder={userOrder} />}
    // </>

    <>
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
          <h5 className="text-center mb-4">What you want now</h5>
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
                {!userOrderInfo ? (
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
                </div>
                ) :(
                  <div className="d-flex align-items-center justify-content-center ms-auto">
                  <button
                    type="submit"
                    onClick={updateOrder}
                    className="btn border border-dark me-2"
                    style={{
                      color: "white",
                      background: "black",
                      width: "50%",
                    }}
                  >
                    Update Order
                  </button>
                </div>
                )}
              </div>

              {/* <div className="container justify-content-center align-items-center">
                {!userOrderInfo && (
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
                  </div>
                )}

                <div className="d-flex align-items-center justify-content-center ms-auto">
                  <button
                    type="submit"
                    onClick={updateOrder}
                    className="btn border border-dark me-2"
                    style={{
                      color: "white",
                      background: "black",
                      width: "50%",
                    }}
                  >
                    Update Order
                  </button>
                </div>
              </div> */}
            </form>
          </div>
        </div>
      </div>

      {userOrder && <UserOrder userOrder={userOrder} />}
    </>
  );
}
