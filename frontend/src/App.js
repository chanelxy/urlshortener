import './App.css';
import React from 'react';
import Tab from './components/Tab';
import pic from './assets/background.svg';

function App() {
  return (
    <div className="container justify-content-center">
      <div className="row my-3">
        <div className="col-lg-6">
          <h1> SHORT.IT </h1>
          <h3>
            The simplest way to share.
          </h3>
          <Tab />

        </div>
        <div className="col-lg-6 mt-5">
          <img src={pic} alt="" className="center-block" />
        </div>
      </div>
    </div>

  );
}

export default App;
