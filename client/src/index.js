import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./Context/AuthContext";
import Login from "./Pages/Login";
import DashboardAdmin from "./Pages/DashboardAdmin";
import DashboardUser from "./Pages/DashboardUser";
import RecoverPass from "./Pages/RecoverPass";
import CarouselPage from "./Pages/Carousel";
import ModRecursos from "./Pages/ModRecursos";
import Test from "./Pages/Test";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/RecoverPassword" element={<RecoverPass />} />
        <Route path="/DashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/DashboardUser" element={<DashboardUser />} />
        <Route path="/Carousel" element={<CarouselPage />}>
          <Route path=":id" element={<CarouselPage />} />
        </Route>
        <Route path="/Recursos" element={<ModRecursos />}>
          <Route path=":id" element={<ModRecursos />} />
        </Route>
        <Route path="/Test" element={<Test />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
