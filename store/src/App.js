import React, { Component } from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  render() {
    return (
       <div className="containe">
         <div className="row">
           <div className="col-6">Column 1</div>
           <div className="col-6">Column 2</div>
         </div>
       </div>
    );
  }
}

export default App;
