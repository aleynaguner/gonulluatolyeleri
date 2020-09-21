//#region imports
import React from "react";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Home } from "./home/Home";
import { AboutUs } from "./aboutus/AboutUs";
import { OurWorkShops } from "./ourworkshops/OurWorkShops";
import { ContactUs } from "./contactus/ContactUs";
//#endregion

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/ourworkshops" component={OurWorkShops} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/contactus" component={ContactUs} />
            <Redirect to="/home" />
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
