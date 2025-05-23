import axios from "axios";
import { useEffect, useState } from "react";

function UserOrder() {
  const URL = "http://localhost:3000/api/user/allOrder";

  const [order, setOrder] = useState([]);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    async function fetchOrder() {
      const response = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      //console.log(response.data);
      setOrder(response.data.orders);
    }
    fetchOrder();
  }, []);

  const d = new Date();
  const yy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();

  //count total item
  const countChai = order.filter((item) => item.Item === "Chai").length;
  const countCoffee = order.filter((item) => item.Item === "Coffee").length;
  const countBlackCoffee = order.filter(
    (item) => item.Item === "Black Coffee"
  ).length;

  const count = countChai + countBlackCoffee + countCoffee;

  return (
    <>
      <div className="container-fluid mt-5 d-flex justify-content-center align-items-center">
        <div
          className="card p-4 shadow-lg"
          style={{ width: "700px", background: "#eae9e7" }}
        >
          <div className="d-flex align-items-center position-relative mt-4">
            <h4 className="position-absolute start-50 translate-middle-x mb-4">
              Todays Order
            </h4>
            <div className="fw-semibold">{`${dd}/${mm}/${yy}`}</div>
          </div>
          <div className="mt-4">
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {order.length > 0 ? (
                  order.map((item, index) => (
                    <tr key={index}>
                      <td>{item.Name}</td>
                      <td>{item.Item}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="text-center">
                      No Data Available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="d-flex mt-4 gap-3 justify-content-center">
            <h6
              className="shadow-lg  p-2 rounded"
              style={{ background: "#c0b2a4", color: "black" }}
            >
              Total Chai <span className="fw-bold">{countChai}</span>{" "}
            </h6>
            <h6
              className="shadow p-2 rounded"
              style={{ background: "#c0b2a4", color: "black" }}
            >
              Total Coffee <span className="fw-bold">{countCoffee}</span>{" "}
            </h6>
            <h6
              className="shadow p-2 rounded"
              style={{ background: "#c0b2a4", color: "black" }}
            >
              Total Black Coffee{" "}
              <span className="fw-bold">{countBlackCoffee}</span>{" "}
            </h6>
          </div>
          <div className="d-flex mt-4 justify-content-center">
            <p
              className="h6 shadow p-2 rounded"
              style={{ background: "#68625c", color: "black" }}
            >
              Total Order <span className="fw-bold">{count}</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOrder;
