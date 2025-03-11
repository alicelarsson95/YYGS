import { Outlet } from "react-router-dom"; 
import { Provider } from "react-redux";
import { router } from "./router";
import "./styles/index.scss"; 


const App = () => {
    return (
     
    <Outlet />
      
    );
};
  

export default App;
