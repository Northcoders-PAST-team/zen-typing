import "./App.css";

import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./Components/User/User";
import Errors from "./Components/Errors/Errors";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/users/:user_id"} element={<User />} />
          <Route path={"*"} element={<Errors />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
