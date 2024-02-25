import React from "react";
import Navbar from "./Components/Shared/Navbar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import NotFound from "./Components/Common/NotFound";
import Login from "./Pages/Login";
import Hijab from "./Components/Home/Hijab";
import Borka from "./Components/Home/Borka";
import RequireAuth from "./Auth/RequireAuth";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AllUsers from "./Pages/Dashboard/AllUsers";
import DashboardLayout from "./Components/Layouts/DashboadLayout";
import MyProfile from "./Pages/Dashboard/MyProfile";
import MyOrders from "./Pages/Dashboard/MyOrders";
import AddProduct from "./Pages/Dashboard/AddProduct";
import ManageProducts from "./Pages/Dashboard/ManageProducts";
import ViewCart from "./Pages/ViewCart";
import ProductDetails from "./Pages/ProductDetails";
import AllProducts from "./Pages/AllProducts";
import AllOrders from "./Pages/Dashboard/AllOrders";
import Footer from "./Components/Shared/Footer";
import ThankYou from "./Pages/ThankYou";
import MessengerCustomerChat from "react-messenger-customer-chat";
import { RiMessengerLine } from "react-icons/ri";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* Add your routes here */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/viewCart" element={<ViewCart />} />
        <Route path="/borka" element={<Borka />} />
        <Route path="/hijab" element={<Hijab />} />
        <Route
          path="/thankyou"
          element={
            <RequireAuth>
              <ThankYou />
            </RequireAuth>
          }
        />
        <Route path="/all-products" element={<AllProducts />} />
        <Route path="/productDetails/:id" element={<ProductDetails />} />
        <Route path="dashboard">
          <Route
            index
            element={
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            }
          />
          <Route
            path="all-users"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <AllUsers />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="add-product"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <AddProduct />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="manage-products"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <ManageProducts />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="my-profile"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <MyProfile />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="my-orders"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <MyOrders />
                </DashboardLayout>
              </RequireAuth>
            }
          />
          <Route
            path="all-orders"
            element={
              <RequireAuth>
                <DashboardLayout>
                  <AllOrders />
                </DashboardLayout>
              </RequireAuth>
            }
          />
        </Route>
        {/* <Route
          path="/dashboard/all-users"
          element={
            <DashboardLayout>
              <AllUsers />
            </DashboardLayout>
          }
        />
        <Route
          path="/dashboard/my-profile"
          element={
            <DashboardLayout>
              <MyProfile />
            </DashboardLayout>
          }
        /> */}
      </Routes>
      <div className="text-blue-600 mr-auto">
        
        <MessengerCustomerChat
          pageId="103523232499808"
          appId="1066323601321012"
        />
      </div>
      <Footer />
    </div>
  );
}

export default App;
