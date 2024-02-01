import { Route, Routes } from "react-router-dom";
import App from "./App";
import { AddBook } from "./pages/AddBook";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="addbook" element={<AddBook />} />
      <Route path="/addbook/:id" element={<AddBook />} />
    </Routes>
  );
};
