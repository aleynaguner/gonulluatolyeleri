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
import { AppConfig, ConfigureApp } from "./utility/AppConfig";
import AdminDashboard from "./admindashboard/AdminDashboard";
//#endregion

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Config: {},
    };
  }

  configureApp = async () => {
    console.log("Application configuring...");

    let configuration = await ConfigureApp();
    configuration.SetAppConfig = (appConfig) => {
      this.setState({ Config: appConfig });
    };

    this.setState({ Config: configuration });
    console.log("Application configured !", configuration);
  };

  async componentDidMount() {
    await this.configureApp();
  }

  render() {
    return (
      <AppConfig.Provider value={this.state.Config}>
        <Router>
          <Header />
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/ourworkshops" component={OurWorkShops} />
            <Route path="/projects" component={Projects} />
            <Route path="/aboutus" component={AboutUs} />
            <Route path="/blog" component={Blog} />
            <Route path="/contactus" component={ContactUs} />
            <Route path="/admindashboard" component={AdminDashboard} />
            <Redirect to="/home" />
          </Switch>
        </Router>
        <Footer />
      </AppConfig.Provider>
    );
  }
}
