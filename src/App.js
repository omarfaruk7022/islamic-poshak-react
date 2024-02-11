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
        <Route
          path="/hijab"
          element={
            <RequireAuth>
              <Hijab />
            </RequireAuth>
          }
        />
        <Route path="/borka" element={<Borka />} />
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
              <DashboardLayout>
                <AllUsers />
              </DashboardLayout>
            }
          />
          <Route
            path="my-profile"
            element={
              <DashboardLayout>
                <MyProfile />
              </DashboardLayout>
            }
          />
          <Route
            path="my-orders"
            element={
              <DashboardLayout>
                <MyOrders />
              </DashboardLayout>
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
    </div>
  );
}

export default App;
