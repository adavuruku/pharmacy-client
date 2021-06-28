import React, {Fragment, useEffect} from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing'
import Navbar from './components/layout/Navbar'
import NavBarTest from './components/layout/NavBarTest'
import Routes from "./components/routing/Routes";

const  App= ()=> {
  return (

      <Router>
        <Fragment>
        <div className="container">
          <NavBarTest />
          {/* <Navbar /> */}
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route component={Routes} />
          </Switch>
          </div>
        </Fragment>
      </Router>
  );
}
export default App;
