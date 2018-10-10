import React, { Component } from "react";
import { InputElement } from "../../components/InputElement/InputElement";
import API from "../../utils/API";

class Signup extends Component {
    state = {
        authenticated: false,
        email: "",
        password: "",
        firstname: "",
        lastname: ""
    };

    componentDidMount() {
        this.isAuthenticated({})
    }

    isAuthenticated(auth) {
        if (auth.status === 200) {
            sessionStorage.setItem('token', auth.config.data);
            window.location.href = "/protected";
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
            API.saveUser({
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname
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
                        <h2>SignUp Form</h2>

                        <form className="login">
                            <InputElement
                                value={this.state.firstname}
                                onChange={this.handleInputChange}
                                name="firstname"
                                placeholder="Enter your First Name"
                                label="First Name"
                                type="text" />
                            <InputElement
                                value={this.state.lastname}
                                onChange={this.handleInputChange}
                                name="lastname"
                                placeholder="Enter Your Last Name"
                                label="Last Name"
                                type="text" />
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
                                disabled={!(this.state.email && this.state.password)}>Sign Up</button>
                        </form>

                        <br />
                        <p>Or Login <a href="/">here</a></p>
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup;