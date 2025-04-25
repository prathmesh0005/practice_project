import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function UpdateItem() {
  const [itemId, setItemId] = useState();
  const { items, refreshItem } = useOutletContext();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const url = `http://localhost:3000/api/item/fetch-item/${itemId}`;
  const updateUrl = `http://localhost:3000/api/item/update-item`;

  useEffect(() => {
    async function fetchItem() {
      const response = await axios.get(url);
      setFormData(response.data[0]);
    }
    fetchItem();
  }, [itemId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.put(updateUrl, formData);
      console.log(response.data);
      await refreshItem();
      navigate("/admin/item-service");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-4 d-flex justify-content-center align-items-center">
      <div>
        <div className="p-2">
          <select
            className="form-select"
            onChange={(e) => {
              setItemId(e.target.value);
            }}
          >
            <option>Select Items </option>
            {items.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        {itemId && formData && (
          <div className="card p-4 mt-3 shadow">
            <form action="" onSubmit={handleSubmit}>
              <div className="d-flex p-3">
                <p className="h6">Name:&nbsp;&nbsp;</p>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex p-3">
                <p className="h6">Price:&nbsp;&nbsp;&nbsp;</p>
                <input
                  type="number"
                  className="form-control"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button type="submit" className="btn btn-dark">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default UpdateItem;
