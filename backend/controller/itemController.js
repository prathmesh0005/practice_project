import { dbConnection } from "../config/db.js";

export const allItems = async (req, res) => {
  const q = "SELECT * FROM items";
  dbConnection.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.status(400).json(err);
    } else {
      return res.status(201).json({ items: data });
    }
  });
};

export const addItem = async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "All field are required." });
    }
    const q = `INSERT INTO items (name, price) VALUES (?,?)`;
    dbConnection.query(q, [name, price], (err, data) => {
      if (err)
        return res
          .status(400)
          .json({ message: "Something wents wrong", error: err.message });

      return res.status(200).json({ message: "Item Added successfully." });
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Internal Server Error." });
  }
};

export const updateItem = async (req, res) => {
  try {
    const { id, name, price } = req.body;
    if (!id || !name || !price) {
      return res.status(400).json({ message: "all fields are required" });
    }
    const q = `UPDATE items SET name = ? , price = ? WHERE  id = ?`;
    dbConnection.query(q, [name, price, id], (err, data) => {
      if (err)
        return res
          .status(400)
          .json({ messahe: "Something wents wrong", error: err.message });

      return res.status(200).json({ message: "Item update successfully." });
    });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Internal Server Error." });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const {id } = req.params;
    if (!id) {
        return res.status(400).json({message:"id is required"})
    }
    const q = `DELETE FROM items WHERE id = ?`
    dbConnection.query(q,[id],(err,data)=>{
        if(err) return res.status(400).json({message:"Spmething wents wrong", error:err.message})
        
        return res.status(200).json({message:"Item deleted successfully."})
    })
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Internal Server Error." });
  }
};


export const itemFetchById = async(req, res)=> {
  try {
    const {id} = req.params;

    if(!id){
      return res.status(400).json({message:"Item id is not found"})
    }
    
    const q = `SELECT * FROM items WHERE id = ?`
    dbConnection.query(q,[id], (err, data)=>{
      if(err) return res.status(400).json({message:"Something wents wrong", error:err.message});
      return res.status(200).json( data)
    })
    
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Internal Server Error." });
  }
}
