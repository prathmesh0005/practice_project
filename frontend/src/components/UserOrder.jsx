import axios from "axios";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function UserOrder({ userOrder }) {
  const [value, setValue] = useState();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    async function getUserOrderItem() {
      try {
        const updatedOrder = JSON.parse(localStorage.getItem("updatedOrder"));
        const id = updatedOrder || userOrder;
        const response = await axios.get(
          `http://localhost:3000/api/user/userOrderItem?id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        if (
          Array.isArray(response.data.orderName) &&
          response.data.orderName.length > 0
        ) {
          setValue(response.data.orderName[0].name);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
    getUserOrderItem();
  }, []);

  return (
    <>
      <div className="container d-flex mt-4 justify-content-center align-item-center">
        <div className="card p-4 shadow-lg" style={{ width: "300px" }}>
          <h5 className="text-center mb-4">Your order is</h5>
          <div className="shadow-lg bg-warning p-2 h5 text-center rounded">
            {value}
          </div>
        </div>
      </div>
    </>
  );
}
