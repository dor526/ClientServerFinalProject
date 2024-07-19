import Dashboard from "./pages/dashboard";
import Login from "./pages/login";

import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path="/dashboard" element={<Dashboard></Dashboard>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
