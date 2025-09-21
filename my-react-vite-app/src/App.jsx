import { Routes, Route, Outlet } from "react-router-dom";
import HomeTemplate from "./template/homeTemplate/HomeTemplate";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/register";
import LawyerList from "./page/LawyerList";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeTemplate />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/lawyerList" element={<LawyerList />} />
      </Route>
    </Routes>
  );
}
