import "./App.css";

import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Errors from "./Components/Errors/Errors";
import { getAuth } from "firebase/auth";

const auth = getAuth();

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav auth={auth} />
        <Routes>
          <Route path={"/"} element={<Home auth={auth} />} />
          <Route path={"*"} element={<Errors />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
