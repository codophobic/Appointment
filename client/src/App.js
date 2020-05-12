import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/profile';
import Bookings from './components/bookings';

function App() {
  return (
    <BrowserRouter>
      <Switch>
      <Route path="/register" exact component={Register}></Route>
      <Route path="/profile" exact component={Profile}></Route>
      <Route path='/bookings' exact component={Bookings}></Route>
        <Route path="/" component={Login}></Route>
       
      </Switch>
    </BrowserRouter>
  );
}

export default App;
