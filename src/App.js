import "./App.css";
import Body from "./components/Body";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Website from "./components/Website";
import HTMLWebsite from "./components/HTMLWebsite";

function App() {
  // const makeAPICall = async () => {
  //   try {
  //     const response = await fetch("http://localhost:8000/data", {
  //       mode: "cors",
  //     });
  //     const data = await response.json();
  //     console.log({ data }, "DATA");
  //   } catch (error) {
  //     console.log(error, "ERROR");
  //   }
  // };
  // useEffect(() => {
  //   makeAPICall();
  // }, []);

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
