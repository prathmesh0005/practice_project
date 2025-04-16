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
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
