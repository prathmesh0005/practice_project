import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Layout from "./Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import { AuthProvider } from "./contaxt/AuthContext";
import Dashboard from "./components/Dashboard";
import Bill from "./components/admin/Bill";
import AdminLayouts from "./layouts/AdminLayouts";
import UserOrder from "./components/UserOrder";
import ItemLayout from "./layouts/ItemLayout";
import AllItem from "./components/admin/AllItem";
import AddItem from "./components/admin/AddItem";
import UpdateItem from "./components/admin/updateItem";
import DeleteService from "./components/admin/DeleteService";
import UserLayouts from "./layouts/UserLayouts";
import GetAdminAccess from "./components/admin/GetAdminAccess";
import DeleteOrder from "./components/admin/DeleteOrder";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />}></Route>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<AdminLayouts />}>
              <Route path="" element={<UserOrder />} />
              <Route path="/admin/bill" element={<Bill />} />
              <Route path="/admin/manage-user" element={<UserLayouts/>}>
                <Route path="" element={<GetAdminAccess/>}/>
                <Route path="/admin/manage-user/delete-order" element={<DeleteOrder/>}/>
              </Route>
              <Route path="/admin/item-service" element={<ItemLayout/>}>
                <Route path="" element={<AllItem/>}/>
                <Route path="/admin/item-service/add-item" element={<AddItem/>}/>
                <Route path="/admin/item-service/update-item" element={<UpdateItem/>}/>
                <Route path="/admin/item-service/delete-item" element={<DeleteService/>}/>
              </Route>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
