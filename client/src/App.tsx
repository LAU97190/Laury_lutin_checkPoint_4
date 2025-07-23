import { Outlet } from "react-router";
import "./App.css";
import Logo from "./components/Logo/Logo";
import NavBar from "./components/NavBar/NavBar";

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
