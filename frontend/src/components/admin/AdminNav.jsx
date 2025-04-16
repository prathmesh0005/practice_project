import { Link } from "react-router-dom";

function AdminNav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light px-3 mt-2 text-black">
      <div className="d-flex gap-5 fw-bold">
        <Link className="nav-link" to="/admin">
          Todays Order
        </Link>
        <Link className="nav-link" to="/admin/bill">
          Generate Bill
        </Link>
        <Link className="nav-link" to="">
          Add User
        </Link>
        <Link className="nav-link" to="">
          Add Items
        </Link>
      </div>
    </nav>
  );
}

export default AdminNav;
