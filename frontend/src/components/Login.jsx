import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contaxt/AuthContext";
import "../css/style.css";
import { Link } from "react-router-dom";

const URL = "http://localhost:3000/api/user/login";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, setIsLoggedIn } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("")
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        URL,
        { email, password },
        { withCredentials: true }
      );
      const data = response.data;
      //console.log(data.user.role);
      login(data.user, data.access_token, data.refresh_token);
      setIsLoggedIn(true);
      data.user.role === "user" ? navigate("/dashboard") : navigate("/admin");
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMessage(error.response.data.message)
      }else{
        setErrorMessage("Something wents wrong please try again!")
      }
    }
  }

  return (
    <>
      <div className="container-fluid d-flex login-bg-container">
        <div
          className="container d-flex justify-content-center align-self-start"
          style={{ marginTop: 200, background:"" }}
        >
          <div
            className="card p-4 shadow-lg border-dark shadow-lg"
            style={{
              width: "330px",
              background: "transparent",
              backdropFilter: "blur(2px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            <h5 className="text-center mb-4">
              <strong>Login</strong>
            </h5>
            <div className="form">
              <form action="" onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control border-info-subtle"
                    placeholder="email"
                    value={email}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control border-info-subtle"
                    placeholder="Password"
                    value={password}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn border border-dark m-2"
                    style={{ background: "#979796", color: "black" }}
                  >
                    <b>LOG IN</b>
                  </button>
                </div>
              </form>
              <div className="mt-2"> 
                <Link to={"/change-password"} className="textcolor d-flex text-decoration-underline justify-content-center hover-blue">Forgate password</Link>
              </div>
            </div>


            {errorMessage && (
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
                <p className="mb-3 " style={{ color: "black", fontWeight:"bold" }}>{errorMessage}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setErrorMessage("");
                    setEmail("")
                    setPassword("")
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
