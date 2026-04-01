import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyPage from "./pages/CompanyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:company" element={<CompanyPage />} />
        <Route path="/" element={<CompanyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;