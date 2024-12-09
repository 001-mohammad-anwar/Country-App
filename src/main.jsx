// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App.jsx";
import Contact from "./Component/Contact.jsx";
import Setting from "./Component/Setting.jsx";
import Home from "./Component/Home.jsx";
import Error from "./Component/Error.jsx";
import CountryDetails from './Component/CountryDetails'



createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} errorElement={<Error />}>
        <Route index element={<Home/>} />
        <Route path="setting" element={<Setting />} />
        <Route path="/about" element={<div>This is div container</div>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/:country" element={<CountryDetails/>} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
