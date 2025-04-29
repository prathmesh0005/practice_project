import { Outlet } from "react-router-dom";
import Admin from "../pages/Admin";

function AdminLayouts() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center ">
      <Admin />
      <Outlet />
    </div>
  );
}

export default AdminLayouts;
