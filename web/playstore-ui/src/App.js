import { HashRouter, Routes, Route } from "react-router-dom";
import CompanyPage from "./pages/CompanyPage";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:company" element={<CompanyPage />} />
        <Route path="/" element={<CompanyPage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
