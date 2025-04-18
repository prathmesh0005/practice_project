import { Outlet } from "react-router-dom"
import ItemServices from "../components/admin/ItemServices"

function ItemLayout() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <ItemServices/>
      <Outlet/>
    </div>
  )
}

export default ItemLayout
