import { Outlet } from "react-router-dom";
import ItemServices from "../components/admin/ItemServices";
import { useState , useEffect} from "react";
import axios from "axios";

function ItemLayout() {
  const [items, setItems] = useState([]);
  const fetchItemUrl = `http://localhost:3000/api/item/all-item`;

  const fetchItem = async () => {
    const response = await axios.get(fetchItemUrl);
    setItems(response.data.items);
  }

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <ItemServices />
      <Outlet context={{items, refreshItem: fetchItem}} />
    </div>
  );
}

export default ItemLayout;
