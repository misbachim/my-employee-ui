import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Employees from './components/employees/Employees';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        {/* <Counter /> */}
        <Employees/>
    </div>
  );
}

export default App;
