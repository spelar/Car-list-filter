import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import ListPage from "./pages/ListPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/car-list-filter" element={<ListPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
