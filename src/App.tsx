import React from 'react';
import "./App.scss";
import { Header } from "./components/header";

function App() {
  return (
    <>
      <Header />
      <div className="container">
        <div className="title">
          <h1>Hello World</h1>
        </div>
      </div>
    </>
  );
}

export default App;
