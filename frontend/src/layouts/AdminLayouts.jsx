import { Outlet } from "react-router-dom";
import Admin from "../pages/Admin";

function AdminLayouts() {
  return (
    <div className="d-flex flex-column align-items-start  min-vh-100" style={{background:"#e1dbd5"}}>
      <Admin />
      <Outlet />
    </div>
  );
}

export default AdminLayouts;
