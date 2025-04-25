import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function DeleteOrder() {
  const { users } = useOutletContext();
  const [userId, setUserID] = useState(null);
  const [user, setUser] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [message, setMessage] = useState();
  const [orderCount, setOrderCount] = useState();

  const getIserUrl = `http://localhost:3000/api/user/get-user/${userId}`;
  const deleteAllUserOrderUrl = `http://localhost:3000/api/user//delete-user-orders/${userId}`;
  const deleteParticularUserOrderUrl = `http://localhost:3000/api/user/delete-particular-user-order`;
  const orderCountUrl = `http://localhost:3000/api/user/order-count/${userId}`;

  useEffect(() => {
    async function fetchUser() {
      if (userId === null) return;
      try {
        const response = await axios.get(getIserUrl);
        setUser(response.data.user[0]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [userId]);

  useEffect(() => {
    async function fetchOrderCount() {
      if (userId === null) return;
      try {
        const response = await axios.get(orderCountUrl);
        setOrderCount(response.data[0]?.total_count || 0);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrderCount();
  }, [userId]);

  async function deleteAllOrders(e) {
    e.preventDefault();
    const isConfirm = confirm("Are you sure to delete all user order");
    if (!isConfirm) return;
    const response = await axios.delete(deleteAllUserOrderUrl);
    setMessage(response.data.message);
  }

  async function deleteParticularOrder(e) {
    e.preventDefault();
    if (startDate === null) {
      alert("Please select a starting date");
      return;
    }
    if (endDate === null) {
      alert("Please select a ending date");
      return;
    }
    const data = {
      id: userId,
      startDate: startDate,
      endDate: endDate,
    };
    const isConfirm = confirm("Are you sure to delete all user order");
    if (!isConfirm) return;
    const response = await axios.delete(deleteParticularUserOrderUrl, {
      data: data,
    });
    setMessage(response.data.message);
  }

  return (
    <div className="container mt-3 d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div>
          <label className="p-2 h6">Select User for delete order&nbsp; </label>
        </div>
        <div>
          <select
            className="mt-2 p-1"
            onChange={(e) => setUserID(e.target.value)}
          >
            <option className="">Select User</option>
            {users &&
              users.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >{`${user.first_name} ${user.last_name}`}</option>
              ))}
          </select>
        </div>
      </div>

      {user && (
        <div className="card mt-4 p-3" style={{ width: 450 }}>
          <p className="text-center fw-bold mt-2">Delete User Previous Order</p>

          {orderCount > 0 ? (
            <div>
              <div className="p-2">
                <p className="text-center h6">
                  Name: {`${user.first_name} ${user.last_name}`}
                </p>
              </div>
              <div className="d-flex justify-content-center">
                <button className="btn btn-dark" onClick={deleteAllOrders}>
                  Delete All Orders
                </button>
              </div>
              <p className="mt-3 text-center h6">
                Delete Order From selected Date
              </p>
              <div className="d-flex gap-3 justify-content-center p-2">
                <div>
                  <p>Select Starting date: </p>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      const formattedDate = date.toISOString().split("T")[0];
                      setStartDate(formattedDate);
                    }}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Click to select a date"
                  />
                </div>
                <div>
                  <p>Select End date:</p>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      const formattedDate = date.toISOString().split("T")[0];
                      setEndDate(formattedDate);
                    }}
                    dateFormat="yyyy/MM/dd"
                    placeholderText="Click to select a date"
                  />
                </div>
              </div>
              <div className="d-flex justify-content-center mt-2">
                <button
                  className="btn btn-dark"
                  onClick={deleteParticularOrder}
                >
                  Delete Order
                </button>
                {message && (
                  <div
                    className="alert alert-warning position-absolute top-50 start-50 translate-middle shadow-lg p-4 rounded"
                    style={{
                      width: "400px",
                      textAlign: "center",
                      zIndex: 1050,
                      border: "1px solid #f5c6cb",
                    }}
                    role="alert"
                  >
                    <p
                      className="mb-3 "
                      style={{ color: "black", fontWeight: "bold" }}
                    >
                      {message}
                    </p>
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        setMessage("");
                      }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-2">
              <p className="text-center h6">{`${user.first_name} ${user.last_name} has No any Orders`}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DeleteOrder;
