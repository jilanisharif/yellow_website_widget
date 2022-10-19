import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Body from "./components/Body";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Website from "./components/Website";
import HTMLWebsite from "./components/HTMLWebsite";

// import got from "got";

function App() {
  const getData = async () => {
    // try {
    //   const res = await got
    //     .get("https://jsonplaceholder.typicode.com/posts/1")
    //     .json();
    //   console.log(res);
    // } catch (err) {
    //   console.log(err);
    // }
  };

  // const getApi = () => {
  //   var config = {
  //     method: "get",
  //     headers: {
  //       "Content-Type": "application/json",

  //       "Access-Control-Allow-Origin": "*",
  //       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  //     },
  //     url: "https://www.yellow.ai",
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       let data = response.data;
  //       console.log(data, "HTML DATA");
  //       // res.json(data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  useEffect(() => {
    // getApi();
    getData();
  }, []);
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
