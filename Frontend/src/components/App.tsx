import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./Auth.tsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="oauth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
