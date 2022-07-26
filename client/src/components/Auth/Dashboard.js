import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Gltf from "../App/Gltf/Gltf";
import { BigLine } from "../App/LoginApp";
import UserUnits from "../UserUnits/UserUnits";
import { useUserContext } from "./UserContext";

function Dashboard() {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    // console.log(user)
    if (Object.keys(user).length === 0) {
      navigate("/home");
      return;
    }

  }, [navigate, user]);

  return (
    <div>
      <h4>Dashboard (Protected)</h4>
      <UserUnits/>
      <BigLine/>
      <Gltf/>
    </div>
  );
}

export default Dashboard;
