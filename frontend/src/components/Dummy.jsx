import { useEffect, useState } from "react";

const URL = "http://localhost:3000/api/user/items";

export default function Dummy(){
    const [item,setItem] = useState([]);
    const [myOrder, setMyOrder] = useState("");

    useEffect(()=>{
        async function fetchItem() {
            const res = await fetch(URL);
            const data = await res.json();
            setItem(data.result);  
        }

        fetchItem();

    },[])
    
    return(
        <>
            <form action="">
                {item.map((field)=>(
                    <div key={field.id}>
                        <label htmlFor="">{field.name}</label>
                        <input 
                            type="radio" 
                            onChange={(e) => setMyOrder(e.target.value)}  
                            name="order_item" 
                            value={field.name}
                        />          
                    </div>
                ))}
            </form>
            {myOrder}
            {/* {item.map((item)=>(<h1 key={item.id}>{item.name}</h1>))} */}
        </>
    )

}