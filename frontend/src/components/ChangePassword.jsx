import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/style.css"

function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const url = `http://localhost:3000/api/user/change-password`;

  async function handleClick(e) {
    e.preventDefault();
    if (password === confirmPassword) {
      const response = await axios.put(url, { email, password });
      setMessage(response.data.message);
    }
  }
  return (
    <>
      <div
        className="container-fluid d-flex justify-content-center align-items-center login-bg-container"
      >
        <div className="card p-4 shadow-lg" style={{ width: "400px", background: "#eae9e7" }}>
          <p className="text-center h6 pb-3">Change Password</p>
          <form action="" className="d-flex flex-column justify-content-center align-items-center">
            <div className="mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{width:"250px"}}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{width:"250px"}}
              />
            </div>
            <div className="mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={{width:"250px"}}
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                onClick={handleClick}
                className="btn btn-primary mt-2"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
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
            <p className="mb-3 " style={{ color: "black", fontWeight: "bold" }}>
              {message}
            </p>
            <button
              className="btn btn-warning"
              onClick={() => {
                // setMessage("");
                navigate("/login");
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ChangePassword;
