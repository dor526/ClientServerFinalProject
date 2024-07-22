import Dashboard from "./pages/dashboard";
import {BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
 import ContactUs from "./pages/contactus";
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <Navbar></Navbar>
      <div className="pages">
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

          <Route path="/dashboard" element={<Dashboard></Dashboard>}>
          </Route>

          <Route path="/login" element={<Login></Login>}>
          </Route>

          <Route path="/signup" element={<Signup></Signup>}>
          </Route>

          <Route path="/contactus" element={<ContactUs></ContactUs>}>
          </Route>
          

        </Routes>

      </div>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
