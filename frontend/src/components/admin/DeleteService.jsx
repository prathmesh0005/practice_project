import axios from "axios";
import { useOutletContext, useNavigate } from "react-router-dom";

function DeleteService() {
  const { items, refreshItem } = useOutletContext();
  const navigate = useNavigate();

  async function handelClick(e) {
    const id = e.target.value;
    const isConfirmed = confirm(`Are you sure to delete this Item`);
    if (!isConfirmed) return;
    const url = `http://localhost:3000/api/item/delete-item/${id}`;
    await axios.delete(url);
    await refreshItem();
    navigate("/admin/item-service");
  }

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="card p-2 shadow mt-4">
        {items.map((item) => (
          <div
            className="card d-flex flex-row align-items-center gap-5 p-2 m-2 shadow"
            key={item.id}
          >
            <label className="ps-2 h6 ">{item.name}</label>
            <button
              className="btn btn-danger ms-auto"
              value={item.id}
              onClick={handelClick}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeleteService;
