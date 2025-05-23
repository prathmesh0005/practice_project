import { Link } from "react-router-dom";
import "../../css/admin.style.css"

function AdminNav() {
  return (
    <div className="container-fluid d-flex justify-content-center ">
      <nav className="navbar navbar-expand-lg navbar-light px-3 mt-2 text-black">
      <div className="d-flex gap-5 fw-bold">
        <Link className="nav-link custom-hover p-2" to="/admin">
          Todays Order
        </Link>
        <Link className="nav-link custom-hover p-2" to="/admin/bill">
          Generate Bill
        </Link>
        <Link className="nav-link custom-hover p-2" to="/admin/manage-user">
          Manage User
        </Link>
        <Link className="nav-link custom-hover p-2" to="/admin/item-service">
          Manage Items
        </Link>
      </div>
    </nav>
    </div>
  );
}

export default AdminNav;
