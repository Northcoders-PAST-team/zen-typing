import './App.css';

import Nav from "./Components/Nav/Nav";
import Home from './Components/Home/Home';
import Loading from './Components/Loading/Loading.jsx'
import {BrowserRouter, Routes, Route} from 'react-router-dom';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route  path={"/"} element={<Home/>}/>
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
