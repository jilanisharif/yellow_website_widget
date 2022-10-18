import "./App.css";
import Body from "./components/Body";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Website from "./components/Website";
import HTMLWebsite from "./components/HTMLWebsite";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/website/:id' element={<Website />} />
          <Route path='/website/html/:id' element={<HTMLWebsite />} />

          <Route exact path='/' element={<Body />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
