import { Outlet } from "react-router-dom";
import UserServices from "../components/admin/UserServices";
import axios from "axios";
import { useEffect, useState } from "react";

function UserLayouts() {
  const [users, setUsers] = useState([]);
  const url = `http://localhost:3000/api/user/user-data`;

  const fetchUser = async () => {
    const response = await axios.get(url);
    setUsers(response.data.users);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <UserServices />
      <Outlet context={{ users, refreshUser: fetchUser }} />
    </div>
  );
}

export default UserLayouts;
