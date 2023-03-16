import "./styles/index.scss";

import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Reservation from "./pages/Reservation";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Login from "./pages/profile/Login";
import ForgetPassword from "./pages/profile/ForgetPassword";
import EmailConfirmation from "./pages/profile/EmailConfirmation";
import Produit from "./pages/Produit";
import Checkout from "./pages/Checkout";
import Register from "./pages/profile/Register";
import Details from "./pages/profile/screens/Details";
import Favourites from "./pages/profile/screens/Favourites";
import ChangePassword from "./pages/profile/screens/ChangePassword";
import History from "./pages/profile/screens/History";
import Profile from "./components/Profile/Profile";
function App() {
  return (
    <Layout>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Menu" element={<Menu />} />
        <Route path="/Cart" element={<Cart />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Produit" element={<Produit />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/ForgetPassword" element={<ForgetPassword />} />
        <Route path="/EmailConfirmation" element={<EmailConfirmation />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/Profile" element={<Profile />}>
          <Route path="/Profile" element={<Details />} />
          <Route path="/Profile/Favourites" element={<Favourites />} />
          <Route path="/Profile/ChangePassword" element={<ChangePassword />} />
          <Route path="/Profile/History" element={<History />} />
        </Route>
      </Routes>
    </Layout>
  );
}

export default App;
