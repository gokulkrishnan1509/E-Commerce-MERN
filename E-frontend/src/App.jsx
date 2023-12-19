import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import OurStore from "./pages/OurStore";
import Blog from "./pages/Blog";
import CompareProduct from "./pages/CompareProduct";
import WishList from "./pages/WishList";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import SingleBlog from "./pages/SingleBlog";
import PrivaPolicy from "./pages/PrivacyPolicy";
import TermAndCondition from "./pages/TermAndCondition";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import SingleProduct from "./pages/SingleProduct";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/profile";
import Checkout from "./pages/Checkout";

import { PrivateRoutes } from "../routing/PrivateRoutes";
import { OpentRoutes } from "../routing/OpenRoutes";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}></Route>
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="product" element={<OurStore />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="product/:id" element={<SingleProduct />} />
            <Route path="compare-product" element={<CompareProduct />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password/:token" element={<ResetPassword />} />
            <Route path="blog/:id" element={<SingleBlog />} />
            <Route path="privacy-policy" element={<PrivaPolicy />} />
            <Route path="term-conditions" element={<TermAndCondition />} />
            <Route path="refund-policy" element={<RefundPolicy />} />
            <Route path="shipping-policy" element={<ShippingPolicy />} />

            {/************           Public Routes           **************/}

            <Route
              path="login"
              element={
                <OpentRoutes>
                  <Login />
                </OpentRoutes>
              }
            />

            <Route
              path="signup"
              element={
                <OpentRoutes>
                  <Signup />
                </OpentRoutes>
              }
            />

            {/**************          Private Routes           ************** */}
            <Route
              path="checkout"
              element={
                <PrivateRoutes>
                  <Checkout />
                </PrivateRoutes>
              }
            />

            <Route
              path="wishlist"
              element={
                <PrivateRoutes>
                  <WishList />
                </PrivateRoutes>
              }
            />
            <Route
              path="cart"
              element={
                <PrivateRoutes>
                  <Cart />
                </PrivateRoutes>
              }
            />
            <Route
              path="my-orders"
              element={
                <PrivateRoutes>
                  <Orders />
                </PrivateRoutes>
              }
            />

            <Route
              path="my-profile"
              element={
                <PrivateRoutes>
                  <Profile />
                </PrivateRoutes>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
