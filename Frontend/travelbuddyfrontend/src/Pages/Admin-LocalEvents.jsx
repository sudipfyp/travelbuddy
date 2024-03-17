import React from "react";
import Sidebar from "../Components/Sidebar";

const AdminLocalEvents = () => {
  return (
    <>
      <div className="admin-container">
        <div className="admin-left">
          <Sidebar />
        </div>

        <div className="admin-right"></div>
      </div>
    </>
  );
};

export default AdminLocalEvents;
