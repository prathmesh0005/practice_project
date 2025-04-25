import axios from "axios";
import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Bill() {
  const url = "http://localhost:3000/api/user/allUser";
  const bill_url = "http://localhost:3000/api/user/user-bill";
  const [users, setUsers] = useState();
  const accessToken = localStorage.getItem("accessToken");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [userId, setUserId] = useState();
  const [billData, setBillData] = useState(null);
  const pdfRef = useRef();

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(response.data.users);
    }
    fetchUsers();
  },[]);

  const formData = {
    user_id: userId,
    startDate: startDate,
    endDate: endDate,
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post(bill_url, formData);
      //console.log(res.data)
      setBillData(res.data.orders);
    } catch (error) {
      console.log(error);
    }
  }

  const generatePDF = async () => {
    const element = pdfRef.current;
    if (!element) {
      return;
    }
    const canvas = await html2canvas(element, {
      scale: 2,
    });
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "potrait",
      unit: "px",
      format: "a4",
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("bill.pdf");
  };

  const d = new Date();
  const yy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();

  useEffect(() => {
    // console.log(startDate);
    // console.log(endDate);
    // console.log(userId);
    //console.log(billData);
  }, [startDate, endDate, userId, billData]);

  const userName = billData && billData[0] ? billData[0].Name : "";
  const total =
    billData && billData[0]
      ? billData.reduce((sum, item) => sum + item.total_price, 0)
      : "0";

  return (
    <>
      <div className="container-fluid mt-5 d-flex justify-content-center">
        <div
          className="card d-flex justify-content-center align-items-center p-4 shadow-lg"
          style={{ width: "700px", background: "#eae9e7" }}
        >
          <h4>Generate Bill</h4>
          <div className="form">
            <div className="d-flex flex-row justify-content-between mt-3  gap-4">
              <div>
                <label>User:&nbsp; </label>
                <select
                  onChange={(e) => setUserId(e.target.value)}
                >
                  <option>Select User</option>
                  {users &&
                    users.map((user) => (
                      <option
                        value={user.id}
                        key={user.id}
                      >{`${user.first_name} ${user.last_name}`}</option>
                    ))}
                </select>
              </div>

              <div>
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

            </div>

            <div className="d-flex justify-content-center mt-3">
              <button onClick={handleSubmit} className="btn btn-dark">
                Generate Bill
              </button>
            </div>

            {billData && (
              <div className="d-flex flex-column jystify-content-center align-items-center">
                <div className="d-flex flex-column jystify-content-center align-items-center mt-3">
                  <h5>Bill</h5>
                  <div
                    ref={pdfRef}
                    className="card mt-2 d-flex justify-content-center align-items-center p-4 shadow-lg"
                    style={{ width: "400px" }}
                  >
                    <div className="d-flex gap-5">
                      <p>Name: {userName}</p>
                      <p>Date: {`${dd}/${mm}/${yy}`}</p>
                    </div>
                    <div>
                      <table className="table table-striped border">
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {billData.length > 0 ? (
                            billData.map((order, index) => (
                              <tr key={index}>
                                <td>{order.name}</td>
                                <td>{order.item_count}</td>
                                <td>{order.price}</td>
                                <td>{order.total_price}</td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" className="text-center">
                                No Data Available{" "}
                              </td>
                            </tr>
                          )}
                          <tr>
                            <th colSpan="3">Total</th>
                            <th>Rs. {total} </th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <button onClick={generatePDF} className="btn btn-dark mt-3">
                  Generate PDF
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Bill;
