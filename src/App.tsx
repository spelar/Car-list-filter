import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "@src/App.css";
import ListPage from "@src/pages/ListPage";

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
