import axios from "axios";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

function GetAdminAccess() {
  const { users } = useOutletContext();
  const [user, setUser] = useState();
  const [userId, setUserID] = useState(null);
  const getIserUrl = `http://localhost:3000/api/user/get-user/${userId}`;
  const changeAccessUrl = `http://localhost:3000/api/user/user-admin-access/${userId}`;
  const removeAccessUrl = `http://localhost:3000/api/user/remove-admin-access/${userId}`;

  useEffect(() => {
    async function fetchUser() {
      if (userId === null) return;
      const response = await axios.get(getIserUrl);
      setUser(response.data.user[0]);
    }
    fetchUser();
  }, [userId]);

  async function giveAccessToUser(e) {
    e.preventDefault();
    const isConfirmed = confirm(
      `Are you sure to give the Admin access to ${user.first_name} ${user.last_name}`
    );
    if (!isConfirmed) return;
    const response = await axios.put(changeAccessUrl);
    console.log(response.data);
    setUserID((prev) => prev);
  }

  async function removeAccess(e) {
    e.preventDefault();
    const isConfirmed = confirm(
      `Are you sure to remove the Admin access to ${user.first_name} ${user.last_name}`
    );
    if (!isConfirmed) return;
    const response = await axios.put(removeAccessUrl);
    console.log(response.data);
    setUserID((prev) => prev);
  }

  return (
    <div className="container mt-3 p-2 d-flex flex-column justify-content-center align-items-center">
      <div>
        <label>User:&nbsp; </label>
        <select onChange={(e) => setUserID(e.target.value)}>
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
      {user && (
        <div className="card mt-4 p-2" style={{ width: 300 }}>
          <p className="text-center fw-bold mt-2">User Access Control</p>
          <div className="p-2">
            <p className="text-center h6">
              Name: {`${user.first_name} ${user.last_name}`}
            </p>
          </div>
          <div className="">
            <p className="text-center h6">Role: {user.role}</p>
          </div>
          <div className="d-flex justify-content-center mt-2 p-2">
            {user.role === "user" ? (
              <button
                className="btn btn-primary mt-2"
                onClick={giveAccessToUser}
              >
                Give Admin Access
              </button>
            ) : (
              <button className="btn btn-primary mt-2" onClick={removeAccess}>
                Remove Admin Access
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GetAdminAccess;
