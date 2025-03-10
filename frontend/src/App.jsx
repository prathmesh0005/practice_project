import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Layout from "./Layout";
import Login from "./components/Login";
import Home from "./components/Home";
import AdminDashboard from "./components/AdminDashboard";
import { AuthProvider } from "./contaxt/AuthContext";
import Dashboard from "./components/Dashboard";


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
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
