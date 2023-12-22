import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ********************** Invoked from pages folder *********************
import Forgotpassword from "./pages/Forgotpassword";
import Resetpassword from "./pages/Resetpassword";
import DashBoard from "./pages/Dashboard";
import Login from "./pages/Login";
import Enquirires from "./pages/Enquires";
import Bloglist from "./pages/Bloglist";
import Blogcatalist from "./pages/Blogcatlist";
import Orders from "./pages/Orders";
import Customers from "./pages/Customer";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Brandlist from "./pages/Brandlist";
import Productlist from "./pages/Productlist";
import Addblog from "./pages/Addblog";
import Color from "./pages/Color";
import Addblogcat from "./pages/Addblogcat";
import AddCat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Couponlist from "./pages/Couponlist";
import AddCoupon from "./pages/AddCoupon";

// ************************ Invoked from component folder ****************
import MainLayout from "./components/MainLayout";
// **********************************Util's**************************
import ViewEnq from "./utils/ViewEnquires";
import ViewOrder from "./utils/ViewOrder";
import { OpenRoutes } from "./Routing/OpenRoutes";
import { PrivateRoutes } from "./Routing/PrivateRoutes";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <OpenRoutes>
                <Login />
              </OpenRoutes>
            }
          />
          <Route path="reset-password" element={<Resetpassword />} />
          <Route path="forgot-password" element={<Forgotpassword />} />
          <Route
            path="admin"
            element={
              <PrivateRoutes>
                <MainLayout />
              </PrivateRoutes>
            }
          >
            <Route index element={<DashBoard />} />
            <Route path="blog-list" element={<Bloglist />} />
            <Route path="coupon-list" element={<Couponlist />} />
            <Route path="customers" element={<Customers />} />
            <Route path="color-list" element={<Colorlist />} />
            <Route path="category-list" element={<Categorylist />} />
            <Route path="list-brand" element={<Brandlist />} />
            <Route path="product-list" element={<Productlist />} />
            <Route path="blog-category-list" element={<Blogcatalist />} />
            <Route path="product" element={<Addproduct />} />

            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<ViewOrder />} />

            {/* ******************Enquirires************* */}
            <Route path="enquiries/:id" element={<ViewEnq />} />
            <Route path="enquiries" element={<Enquirires />} />

            {/* ***************blog******************  */}
            <Route path="blog-add/:id" element={<Addblog />} />
            <Route path="blog-add" element={<Addblog />} />
            {/******************** blog-category ******************/}
            <Route path="blog-category" element={<Addblogcat />} />
            <Route path="blog-category/:id" element={<Addblogcat />} />
            {/*************************** Coupon ************************/}
            <Route path="coupon" element={<AddCoupon />} />
            <Route path="coupon/:id" element={<AddCoupon />} />
            {/************************** Color ************************/}
            <Route path="Color" element={<Color />} />
            <Route path="Color/:id" element={<Color />} />
            {/**********************  Brand Component ********************************/}
            <Route path="brand" element={<Addbrand />} />
            <Route path="brand/:id" element={<Addbrand />} />
            {/**************************** * Producy Category *************/}
            <Route path="category" element={<AddCat />} />
            <Route path="category/:id" element={<AddCat />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
