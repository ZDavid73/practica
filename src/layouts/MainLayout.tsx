import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%" }}>
      <div style={{ flex: 1, overflow: "auto", width: "100%", display: "flex", justifyContent: "center" }}>
        <div style={{ padding: "1rem", maxWidth: "640px", width: "100%" }}>
          <Outlet />
          <br />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;