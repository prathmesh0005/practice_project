import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/style.css";

const URL = "http://localhost:3000/api/user/register";

export default function Register() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClose = () => {
    setMessage("");
    setErrorMessage("");
    navigate("/login");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (data.password.length < 8) {
        setErrorMessage("Password must be at least 8 characters long");
        return;
      }
      const response = await axios.post(URL, data);
      setMessage(response.data.message);
      setData({ first_name: "", last_name: "", email: "", password: "" });
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Something went wrong. Please try again");
      }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-item-center login-bg-container">
        <div
          className="card p-4 shadow-lg "
          style={{ width: "400px", background: "#eae9e7" }}
        >
          <h5 className="text-center mb-4">Create your Account</h5>
          <div className="form">
            <form
              action=""
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <div className="mb-3">
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="First Name"
                  name="first_name"
                  value={data.first_name}
                  style={{ width: "250px" }}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Last Name"
                  name="last_name"
                  value={data.last_name}
                  style={{ width: "250px" }}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Email"
                  name="email"
                  value={data.email}
                  style={{ width: "250px" }}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  value={data.password}
                  style={{ width: "250px" }}
                  required
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={handleClick}
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>

            {message && (
              <div
                className="alert alert-success position-absolute top-50 start-50 translate-middle shadow-lg p-4 rounded"
                style={{
                  width: "400px",
                  textAlign: "center",
                  zIndex: 1050,
                  border: "1px solid #c3e6cb",
                }}
                role="alert"
              >
                <p className="mb-3">{message}</p>
                <button className="btn btn-danger" onClick={handleClose}>
                  Cancel
                </button>
              </div>
            )}

            {errorMessage && (
              <div
                className="alert alert-danger position-absolute top-50 start-50 translate-middle shadow-lg p-4 rounded"
                style={{
                  width: "400px",
                  textAlign: "center",
                  zIndex: 1050,
                  border: "1px solid #f5c6cb",
                }}
                role="alert"
              >
                <p className="mb-3">{errorMessage}</p>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    if (
                      errorMessage === "Password must be at least 8 characters long"
                    ) {
                      setErrorMessage("");
                      setData((prev) => ({
                        ...prev,
                        password: "",
                      }));
                    } else {
                      setErrorMessage("");
                      setData({
                        first_name: "",
                        last_name: "",
                        email: "",
                        password: "",
                      });
                    }
                  }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
