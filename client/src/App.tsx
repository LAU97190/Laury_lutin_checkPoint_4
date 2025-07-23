import { Outlet } from "react-router";
import "./App.css";
import Logo from "./components/Logo/Logo";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Logo />
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
