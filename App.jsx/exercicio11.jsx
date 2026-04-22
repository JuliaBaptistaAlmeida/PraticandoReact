import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppLayout } from "./shared/layout/AppLayout";
import { Home } from "./pages/Home";
import { About } from "./pages/About";

export function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}
