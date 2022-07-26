import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./UserContext";

function NoMatch() {
  const { user } = useUserContext();
  console.log(user);
  const { displayName } = user;
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length === 0) {
      navigate("/home");
      return;
    }

    if (displayName > 0) {
      navigate("/dashboard");
    } else {
      navigate("/home");
    }
  }, [displayName, navigate, user]);

  return (
    <div>
      <h4>No Match (Public)</h4>
    </div>
  );
}

export default NoMatch;
