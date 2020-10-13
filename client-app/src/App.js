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
import { Projects } from "./projects/Projects";
import { Blog } from "./blog/Blog";
import { ContactUs } from "./contactus/ContactUs";
//#endregion

function App() {
  return (
    <React.Fragment>
      <Router>
        <Header />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/ourworkshops" component={OurWorkShops} />
          <Route path="/projects" component={Projects} />
          <Route path="/aboutus" component={AboutUs} />
          <Route path="/blog" component={Blog} />
          <Route path="/contactus" component={ContactUs} />
          <Redirect to="/home" />
        </Switch>
      </Router>
      {/* <Footer /> */}
    </React.Fragment>
  );
}

export default App;
