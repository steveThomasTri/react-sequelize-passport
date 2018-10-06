import React, { Component } from "react";
import { InputElement } from "../../components/InputElement/InputElement";
import API from "../../utils/API";

class Login extends Component {
    state = {
        authenticated:false,
        email: "",
        password: ""
    };

    componentDidMount(){
        this.isAuthenticated({})
    }

    isAuthenticated(auth){
        if (auth.status === 200){
            console.log(auth.config.data);
            this.setState({
                authenticated: true
            });
        }
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.password && this.state.email) {
            API.getUser({
                email: this.state.email,
                password: this.state.password,
            })
            .then(res => this.isAuthenticated(res))
            .catch(err => console.log(err));
        }
    };

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <h2>Login Form</h2>

                        <form className="login">
                            <InputElement
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name="email"
                                placeholder="Email"
                                label="Email Address"
                                type="email" />
                            <InputElement
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                placeholder="Enter Password"
                                label="Password"
                                type="password" />
                            <button
                                onClick={this.handleFormSubmit}
                                className="btn btn-default"
                                disabled={!(this.state.email && this.state.password)}>Login</button>
                        </form>

                        <br />
                        <p>Or sign up <a href="/signup">here</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;