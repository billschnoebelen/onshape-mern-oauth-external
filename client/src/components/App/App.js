import "./App.css";


import { UserContextProvider } from "../Auth/UserContext";
import { LoginApp } from "./LoginApp";


function App() {
  return (
    <UserContextProvider>
     <LoginApp/>
    </UserContextProvider>
  );
}


export default App;
