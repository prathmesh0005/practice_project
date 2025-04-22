import { Link } from "react-router-dom";

function UserServices() {
  const cardItem = [
    {
      title: "Admin Access",
      slug: "",
    },
    {
      title: "Delete User Order",
      slug: "",
    },
  ];

  return (
    <>
      <div className="container-fluid d-flex gap-5 p-2 mt-3">
        {cardItem.map((item, index) => (
          <div
            key={index}
            className="card  p-2 shadow text-center custom-hover h6"
          >
            <Link
              className="nav-link d-flex justify-content-center align-items-center"
              to={item.slug}
              style={{ width: 150, height: 60 }}
            >
              {item.title}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default UserServices;
