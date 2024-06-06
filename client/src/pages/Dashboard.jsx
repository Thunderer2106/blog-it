/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSIdebar from "../components/DashSIdebar";

const Dashboard = () => {
  const loc = useLocation();
  const [tab, settab] = useState("");
  useEffect(() => {
    const searchParams = new URLSearchParams(loc.search);
    const val = searchParams.get("tab");
    settab(val);
  }, [loc.search]);
  return (
    <div className="flex flex-col   md:flex-row min-h-screen">
      <div className="md:w-56">
        <DashSIdebar />
      </div>
      {tab === "profile" && <DashProfile />}
    </div>
  );
};

export default Dashboard;
