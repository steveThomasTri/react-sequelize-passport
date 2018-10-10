import React, { Component } from "react";
import { BrowserRouter, Route, Redirect, withRouter, Link } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Auth from "./utils/auth.js";

const Protected = () => <h3>Protected Content</h3>;

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    Auth.isUserAuthenticated() === true
      ? <Component {...props} />
      : <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
  )} />
);

const AuthButton = withRouter(({ history }) => (
  Auth.isUserAuthenticated() ? (
    <p>
      Welcome to this amazing content! <button onClick={() => {
        Auth.deauthenticateUser(() => history.push('/')); window.location.href = "/";
      }}>Sign out</button>
    </p>
  ) : (
      <p>You are not logged in.</p>
    )
));

class App extends Component {

  state = {
    authenticated: false
  }

  componentDidMount() {
    this.setState({ authenticated: Auth.isUserAuthenticated() }, function () {
      console.log(this.state.authenticated)
    });
  }

  render() {
    return (
      <div className="App">
        <Nav {...(sessionStorage.getItem("token") ? { whoSignedIn: JSON.parse(sessionStorage.getItem("token")).email } : {})} />
        <header className="App-header">
          <h1 className="App-title">Welcome to React Router Protection Sample</h1>
        </header>
        <BrowserRouter>
          <div>
            <AuthButton />
            <ul>
              <li><Link to="/public">Home</Link></li>

              {this.state.authenticated ? (<div></div>) : (
                <div>
                  <li><Link to="/login">Login Here</Link></li>
                  <li><Link to="/signup">SignUp Here</Link></li>
                </div>
              )}

              <li><Link to="/protected">Protected Content</Link></li>
            </ul>
            <Route path="/public" component={Home} />
            <Route path="/login" component={Login} />
            <Route path='/signup' component={Signup} />
            <ProtectedRoute path='/protected' component={Protected} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
