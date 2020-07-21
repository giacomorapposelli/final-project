import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.resetError = this.resetError.bind(this);
    }
    handleChange(event) {
        let name = event.target.name;
        let val = event.target.value;
        this.setState({ [name]: val });
        console.log("IMPUTS CHANGING: ", this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        axios
            .post("/login", {
                email: this.state.email,
                password: this.state.password,
            })
            .then((response) => {
                location.replace("/");
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                console.log("error: ", err);
            });
    }
    resetError(event) {
        event.preventDefault();
        this.setState({
            error: false,
        });
    }

    render() {
        return (
            <div className="login-form">
                <h2>Log in:</h2>
                <form onSubmit={this.handleSubmit} className="input-fields">
                    <input
                        type="email"
                        name="email"
                        onChange={this.handleChange}
                        placeholder="Email"
                        required
                        onFocus={this.resetError}
                    />
                    <input
                        type="password"
                        name="password"
                        onChange={this.handleChange}
                        placeholder="Password"
                        required
                        onFocus={this.resetError}
                    />
                    <button>Log in</button>
                </form>
                <p>
                    <Link to="/reset">Forgot password?</Link>
                </p>
                {(this.state.error && (
                    <p className="error">Email or Password aren't correct</p>
                )) || (
                    <p className="no-error">Email or Password aren't correct</p>
                )}
            </div>
        );
    }
}
