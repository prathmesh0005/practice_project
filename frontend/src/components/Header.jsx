import { use, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contaxt/AuthContext";
import axios from "axios";

const URL = `http://localhost:3000/api/user/logout`;

export default function Header() {
  const { isLoggedIn, setIsLoggedIn, setUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  async function handleLogout(e) {
    e.preventDefault();
    try {
      if (!user) return;
      console.log(user)
      await axios.put(
        URL,
        { id: user.id },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setIsLoggedIn(false);
      setUser(null);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {!isLoggedIn ? (
        <header className=" shadow">
          <nav
            className="navbar navbar-expand-lg navbar-light px-3"
            style={{ background: "#cbc9c6" }}
          >
            <div className="navbar-brand">
              <strong>Order Now ☕</strong>
            </div>
            <div className="ms-auto">
              <Link
                className="btn border border-dark me-2"
                to="/register"
                style={{ background: "#9d9a97", color: "black" }}
              >
                <b>Sign Up</b>
              </Link>
              <Link
                className="btn border border-dark me-2"
                to="/login"
                style={{ background: "#9d9a97", color: "black" }}
              >
                <b>Login</b>
              </Link>
            </div>
          </nav>
        </header>
      ) : (
        <header className="shadow">
          <nav
            className="navbar navbar-expand-lg navbar-light px-3"
            style={{ background: "#cbc9c6" }}
          >
            <div className="navbar-brand">
              <strong>Order Now ☕</strong>
            </div>
            <div className="ms-auto">
              <button
                className="btn border border-dark me-2"
                style={{ background: "#9d9a97", color: "black" }}
                onClick={handleLogout}
              >
                <b>Sign Out</b>
              </button>
            </div>
          </nav>
        </header>
      )}
    </>
  );
}
