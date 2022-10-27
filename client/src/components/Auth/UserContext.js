import React, { useState, useContext, createContext } from "react";

// create context
const UserContext = createContext();

// context consumer hook
const useUserContext = () => {
  // get the context
  const context = useContext(UserContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

const UserContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [user, setUser] = useState({});

  const handleOauth = () =>
  // console.log(process.env.OS_OAUTH_CLIENT_KEY)
    window.location.replace(
      `https://oauth.onshape.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_OS_OAUTH_CLIENT_KEY}`
    );

  const handleLoginData = (token) => {
    // console.log("token", token);
    setUser(token);
  };

  const handleLogout = () => {
    setUser({});
  };

  const getAccessToken = () => {
    // Need to check if it is still good here
    const { accessToken } = user;
    return accessToken;
  };

  const values = {
    user,
    handleOauth: handleOauth,
    handleLoginData: handleLoginData,
    handleLogout: handleLogout,
    getAccessToken: getAccessToken,
  };

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={values}>
      {console.log("rendering user context")}
      {children}
    </UserContext.Provider>
  );
};

export { useUserContext, UserContextProvider };
