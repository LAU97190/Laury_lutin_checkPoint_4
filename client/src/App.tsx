import { Outlet } from "react-router";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Logo from "./components/Logo/Logo";

function App() {
  return (
    <>
      <Logo />
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
