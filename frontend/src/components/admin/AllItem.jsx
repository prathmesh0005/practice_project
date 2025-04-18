import { useOutletContext } from "react-router-dom"


function AllItem() {
  const {items} = useOutletContext();

  return (
    <div className="container mt-3 p-2 d-flex flex-column jystify-content-center align-items-center">
      <h5 className="p-4">All Items List</h5>
      <table className="table table-striped border"> 
         <thead className="table-dark">
           <tr>
            <td>Name</td>
            <td>Price</td>
           </tr>
         </thead>
         <tbody>
          { items.length > 0 ?(
               items.map((item)=>(
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>Rs. {item.price}</td>
                </tr>
               ))
          ):(
            <tr>
              <td>No Data Available</td>
            </tr>
          )
             
          }
         </tbody>
      </table>
    </div>
  )
}

export default AllItem
