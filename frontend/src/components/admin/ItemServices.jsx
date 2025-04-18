import { Link } from "react-router-dom";
import "../../css/admin.style.css"

function ItemServices() {

    const cardItem = [
        {
            title:"All Items",
            slug:"/admin/item-service"
        },
        {
             title:"Add Item",
            slug:"/admin/item-service/add-item"
        },
        {
            title:"Update Item",
            slug:"/admin/item-service/update-item"
        },
        {
             title:"Delete Item",
            slug:"/admin/item-service/delete-item"
        }
    ]

  return (
    <>
    <div className="container-fluid d-flex gap-5 p-2 mt-2">
          {
            cardItem.map((item,index)=>(
                <div key={index} className="card  p-2 shadow text-center custom-hover h6" >
                <Link className="nav-link d-flex justify-content-center align-items-center" to={item.slug} style={{width:150, height:60 }}>{item.title}</Link></div>
            ))
          }
    </div>
    </>
  );
}

export default ItemServices;
