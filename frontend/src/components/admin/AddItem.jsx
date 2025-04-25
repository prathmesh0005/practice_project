import axios from "axios";
import {  useState } from "react"
import { useNavigate, useOutletContext } from "react-router-dom";

function AddItem() {
    const [name, setname] = useState("");
    const [price, setPrice] = useState("")
    const [message, setMessage] = useState("")
    const navigate = useNavigate()
    const {refreshItem} = useOutletContext()

    const url = `http://localhost:3000/api/item/add-item`

    async function handleClick(e) {
        e.preventDefault(); 

        try {
            const response = await axios.post(url,{name,price});
            setMessage(response.data.message)
            await refreshItem()
           
        } catch (error) {
            console.log(error)
        }
    }
   
    
  return (
    <div className="container mt-3 p-2 d-flex flex-column jystify-content-center align-items-center">
    <h4 className="p-2">Add New Item</h4>
    <div className="card p-3 shadow">
        <form action="" onSubmit={handleClick}>
           <div className="p-3">
           <input type="text" className="form-control" value={name} placeholder="Enter product name" onChange={(e)=> setname(e.target.value)}/>
           </div>
           <div className="p-3">
           <input type="number" className="form-control" value={price} placeholder="Enter product price" onChange={(e)=> setPrice(e.target.value)} />
           </div>
           <div className="d-flex justify-content-center align-items-center">
            <button type="submit" className="btn btn-dark" >Submit</button>
           </div>
        </form>
        {
            message && (
                <div
                className="alert alert-warning position-absolute top-50 start-50 translate-middle shadow-lg p-4 rounded"
                style={{
                  width: "400px",
                  textAlign: "center",
                  zIndex: 1050,
                  border: "1px solid #f5c6cb",
                }}
                role="alert"
              >
                <p className="mb-3 " style={{ color: "black", fontWeight:"bold" }}>{message}</p>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                   setMessage("")
                   setname("")
                   setPrice("")
                   navigate("/admin/item-service")
                  }}
                >
                  Close
                </button>
              </div>
            )
        }
    </div>
      
    </div>
  )
}

export default AddItem
