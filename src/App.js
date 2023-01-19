
import { Container } from "@mui/material";
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import {Switch} from "react-router-dom";
import "./App.css"
import { Header } from './components/Header/Header';
import Box from './components/Navbar/Navbar'
import Trending from "./components/Pages/Trending/Trending";
import Search from "./components/Pages/Search/Search";
import Series from "./components/Pages/Series/Series";
import Movies from "./components/Pages/Movies/Movies";

function App() {
  return (
    <BrowserRouter>
    <div className="app">
    <Header />
      <div className="buttom">
      <Container>
        <Switch>
          <Route path="/" component={Trending} exact />
          <Route path="/movies" component={Movies} />
          <Route path="/series" component={Series} />
          <Route path="/search" component={Search} />
        </Switch>
      </Container>
      </div>
    </div>
    <Box />
    
    
    </BrowserRouter>
  );
}

export default App;
