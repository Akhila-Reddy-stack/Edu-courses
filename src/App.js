import React from "react";
import "./App.scss";
import './styles/signup.scss'
import './styles/otp.scss'
import './styles/courses.scss'
import './styles/content.scss'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import UserHome from "./Pages/User/UserHome";
import Otp from "./Pages/User/otp";
import Courses from "./Pages/User/courses";
import Chapters from "./Pages/User/Chapters";

function App(props) {
  return (
    <Router>
      <div className="App">
        <div className="wrapper" style={{ width: "100%" }}>
          <Switch>
            <Route path="/login" component={UserHome} />
            <Route path="/otp" component={Otp} />
            <Route path="/courses" component={Courses} />  
            <Route path="/chapter" component={Chapters} />
            <Redirect to="/login" component={UserHome}></Redirect>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;

