import { dbConection } from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    },
    process.env.ACCESS_TOKEN_SECRETE,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.REFRESH_TOKEN_SECRETE,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const refreshAccessToken = (req, res) => {
  const refresh_token = req.cookies.refresh_token;

  if (!refresh_token) {
    return res.status(401).json({ message: "Refresh token not found" });
  }

  const q = "SELECT * FROM users WHERE refresh_token = ?";

  dbConection.query(q, [refresh_token], (err, data) => {
    if (err) return res.status(500).json({ error: err.message });

    if (data.length === 0) {
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    const user = data[0];

    jwt.verify(
      refresh_token,
      process.env.REFRESH_TOKEN_SECRETE,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });

        const newAccessToken = generateAccessToken(user.id);

        res.json({ access_token: newAccessToken });
      }
    );
  });
};

export const getAllUser = async (req, res) => {
  const q = "SELECT * FROM users";
  dbConection.query(q, (error, data) => {
    if (error) {
      return res.json(error);
    } else {
      return res.json(data);
    }
  });
};

export const register = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    // console.log(hashPassword);
    const q =
      "INSERT INTO users (first_name,last_name,email,password) VALUES (?,?,?,?)";

    dbConection.query(
      q,
      [first_name, last_name, email, hashPassword],
      (err, data) => {
        if (err) {
          if (err.code === "ER_DUP_ENTRY") {
            return res
              .status(400)
              .json({ message: "This Email is already registred." });
          }
          return res.status(400).json({ message: "Something wents wrongs." });
        } else {
          return res
            .status(200)
            .json({ message: "User register successfully" });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "Internal Server Error." });
  }
};

export const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const selectQuery = "SELECT * FROM users WHERE email = ?";
    dbConection.query(selectQuery, [email], async (err, data) => {
      if (err) return res.status(500).json({ error: err.message });

      if (data.length === 0)
        return res.status(400).json({ message: "User not found" });

      const user = data[0];

      const passwordCheck = await bcrypt.compare(password, user.password);

      if (!passwordCheck) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const access_token = generateAccessToken(user);
      const refresh_token = generateRefreshToken(user);

      const updateQuery = "UPDATE users SET refresh_token = ? WHERE id = ?";

      dbConection.query(updateQuery, [refresh_token, user.id], (updateErr) => {
        if (updateErr)
          return res.status(500).json({ error: updateErr.message });

        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // Only secure in production
          sameSite: "strict",
        });

        res.status(200).json({
          message: "Login successful",
          access_token,
          user: {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            role: user.role,
          },
        });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const logOut = (req, res) => {
  try {
    const { id } = req.body;

    const q = `UPDATE users SET refresh_token = NULL WHERE id = ?`;

    dbConection.query(q, [id], (updateErr) => {
      if (updateErr) return res.status(500).json({ error: err.message });

      return res
        .status(200)
        .clearCookie("refresh_token", {
          httpOnly: true,
          secure: true,
        })
        .json({ message: "User log out" });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

export const userOrder = async (req, res) => {
  try {
    const { user_id, items_id } = req.body;

    if (!user_id || !items_id) {
      return res
        .status(400)
        .json({ message: "user_id and item_id are required." });
    }

    const q = "INSERT INTO orders (user_id,items_id) VALUE (?,?)";

    dbConection.query(q, [user_id, items_id], async (err, data) => {
      if (err)
        return res.status(400).json({ message: "Something wents wrongs." });

      if (data.affectedRows === 0)
        return res.status(400).json({ message: "order not recived" });

      res.status(200).json({
        message: "Order received successfully",
        order: {
          id: data.insertId,
          // userId : user_id,
          // itemId : items_id
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error." });
  }
};

//controller for fetch the todays all order
export const fetchOrder = (_, res) => {
  try {
    const q = `SELECT 
                    CONCAT(u.first_name," ", u.last_name) AS Name, 
                    o.createdAt AS Date, 
                    i.name AS Item
                FROM items AS i 
                INNER JOIN orders AS o ON i.id = o.items_id 
                INNER JOIN users AS u ON  o.user_id = u.id 
                WHERE DATE(createdAt) = CURDATE()`;

    dbConection.query(q, (err, data) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(200).json({ orders: data });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const getUserOrderName = async (req, res) => {
  try {
    const q = `SELECT i.name 
                   FROM items as i 
                   INNER JOIN orders as o on i.id = o.items_id
                   WHERE o.id = ?;`;

    dbConection.query(q, [req.query.id], (err, data) => {
      if (err) return res.status(400).json({ message: err.message });

      res.status(200).json({ orderName: data });
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const updateOrder = (req, res) => {
  try {
    const { itemId, id } = req.body;

    if (!itemId || !id) {
      return res.status(400).json({ message: "Missing itemId or id" });
    }

    const q = `UPDATE orders SET items_id = ? WHERE id = ?`;

    dbConection.query(q, [itemId, id], (err, data) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }

      if (data.affectedRows === 0) {
        return res
          .status(404)
          .json({ message: "Order not found or no changes made" });
      }

      return res.status(200).json({
        message: "Order updated successfully",
        order: {
          id: id,
        },
      });
    });
  } catch (error) {}
};

export const getUserPrivousOrder = async (req, res) => {
  try {
    const { userId } = req.body;

    // if (!userId) {
    //   return res.status(400).json({ message: "User not found" });
    // }

    const q = `SELECT i.name AS orderName, o.id as orderId
                FROM items AS i
                INNER JOIN orders AS o ON i.id = o.items_id
                INNER JOIN users AS u ON o.user_id = u.id
                WHERE u.id = ? and date(createdAt) = CURDATE()`;

    dbConection.query(q, [userId], (err, data) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      } else {
        return res.status(200).json({ result: data });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const {id} = req.params;

    const q = `DELETE FROM orders WHERE id = ?`;

    dbConection.query(q,[id], (err, data)=>{
      if(err) return res.status(400).json({ message: err.message });
     
      return res.status(200).json({message:"Order Deleted successfully."})
    })
    
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};
