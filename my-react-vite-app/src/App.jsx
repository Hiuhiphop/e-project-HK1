import { Routes, Route, Outlet } from "react-router-dom";
import HomeTemplate from "./template/homeTemplate/homeTemplate";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/register";



export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Route>
    </Routes>
  );
}
