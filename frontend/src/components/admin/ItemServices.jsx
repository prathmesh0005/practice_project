import { Link } from "react-router-dom";
import "../../css/admin.style.css";

function ItemServices() {
  const cardItem = [
    {
      title: "All Items",
      slug: "/admin/item-service",
    },
    {
      title: "Add Item",
      slug: "/admin/item-service/add-item",
    },
    {
      title: "Update Item",
      slug: "/admin/item-service/update-item",
    },
    {
      title: "Delete Item",
      slug: "/admin/item-service/delete-item",
    },
  ];

  return (
    <>
      <div className="container-fluid d-flex justify-content-center gap-5 p-2 mt-3">
        {cardItem.map((item, index) => (
          <div
            key={index}
            className="card  p-2 shadow text-center custom-hover h6"
            style={{ width: 160, minHeight: 70 }}
          >
            <Link
              className="nav-link d-flex justify-content-center align-items-center"
              to={item.slug}
              style={{ width: "100%", height: "100%" , wordBreak: "break-word", whiteSpace: "normal"}}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default ItemServices;
