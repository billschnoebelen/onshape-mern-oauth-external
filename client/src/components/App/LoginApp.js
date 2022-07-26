import { useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import Home from "../Auth/Home";
import Dashboard from "../Auth/Dashboard";
import NoMatch from "../Auth/NoMatch";
import { useUserContext } from "../Auth/UserContext";
import { decodeToken } from "react-jwt";

export const LoginApp = () => {
  return (
    <div className="App">
      <header className="App-header">
        <strong>Onshape Oauth Connection Test</strong>
        <BigLine />
        <LoginStatus />
        <BigLine />
        <UserInfo />
        <BigLine />

        <div>
          Routes
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user/:token" element={<User />} />
            {/* // no match returns home */}
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </div>
      </header>
    </div>
  );
};

export const BigLine = () => {
  return (
    <hr
      style={{
        background: "hsl(194, 55%, 30%)",
        color: "hsl(194, 55%, 30%)",
        borderColor: "hsl(194, 55%, 30%)",
        height: "3px",
        width: "60%",
      }}
    />
  );
};

const LoginStatus = () => {
  // access the context value
  const { user, handleOauth, handleLogout } = useUserContext();

  if (user?.os_id) {
    return (
      <div>
        <p>You are logged in</p>
        <button className="big_button" type="button" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <p>You are not logged in</p>
        <button className="big_button" type="button" onClick={handleOauth}>
          Sign In
        </button>
      </div>
    );
  }
};

const UserInfo = () => {
  const { user } = useUserContext();

  return (
    <div>
      {user?.os_id && (
        <div>
          {/* <p>User id: {user?.os_id}</p> */}
          <p>Display Name: {user?.displayName}</p>
          <img src={user?.image} alt="user profile"></img>
        </div>
      )}
    </div>
  );
};

const User = () => {
  const { handleLoginData } = useUserContext();
  let { token } = useParams();
  // console.log("token", token);

  const navigate = useNavigate();

  const decodedToken = decodeToken(token);
  // console.log("decodedToken", decodedToken)

  useEffect(() => {

    
    handleLoginData(decodedToken);
    navigate("/dashboard");
  }, [decodedToken, handleLoginData, navigate]);

  return (
    <>
      <h3>User (redirect)</h3>
    </>
  );
};
