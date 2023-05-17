import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Settings from "./Settings";
import Tables from "./Tables";
import Users from "../../../components/Pages/Admin/Users";
import Sidebar from "../../Admin/Sidebar";

const Admin = () => {
  return (
    <Sidebar>
      <div className="md:ml-64">
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/admin/settings" element={Settings} />
          <Route path="/admin/tables" element={Tables} />
          <Route path="/users" element={Users} />
        </Routes>
      </div>
    </Sidebar>
  );
};

export default Admin;
