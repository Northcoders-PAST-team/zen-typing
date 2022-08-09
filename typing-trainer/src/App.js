import "./App.css";

import Nav from "./Components/Nav/Nav";
import Home from "./Components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./Components/User/User";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/users/:user_id"} element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
