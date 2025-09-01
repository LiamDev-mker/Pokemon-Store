import { Routes, Route } from "react-router-dom";
import PrincipalPage from "./Pages/PrincipalPage";
import Checkout from "./Pages/Checkout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PrincipalPage />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  );
}
export default App;
