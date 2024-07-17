import Dashboard from "./pages/dashboard";
import {BrowserRouter, Route, Routes} from 'react-router-dom'
function App() {
  return (
    <div className="App">
     <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Dashboard></Dashboard>}>
          </Route>

        </Routes>

      </div>
     
     </BrowserRouter>
    </div>
  );
}

export default App;
