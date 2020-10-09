import React from "react";
import axios from "./axios";
// import { Link } from "react-router-dom";
import VinylSlider from "./vinylslider";

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            address: "",
            zip: "",
            city: "",
            country: "",
            password1: "",
            password2: "",
            vinylSlider: "hidden",
            tapeModal: "hidden",
            tshirtModal: "hidden",
            longsleeveModal: "hidden",
            overlay: "",
            error: false,
            noMatch: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetError = this.resetError.bind(this);
        this.setError1 = this.setError1.bind(this);
        this.setError2 = this.setError2.bind(this);
        this.setError3 = this.setError3.bind(this);
        this.setError4 = this.setError4.bind(this);
        this.setVinylModal = this.setVinylModal.bind(this);
        this.setTapeModal = this.setTapeModal.bind(this);
        this.setTshirtModal = this.setTshirtModal.bind(this);
        this.setLongsleeveModal = this.setLongsleeveModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        axios
            .post("/register", this.state)
            .then((response) => {
                if (response.data.noMatch) {
                    this.setState({
                        noMatch: true,
                    });
                } else {
                    this.props.setItems();
                }
            })
            .catch((err) => {
                this.setState({
                    error: true,
                });
                const errorMsg = document.querySelector(".reg-error");
                setTimeout(() => (errorMsg.style.visibility = "hidden"), 3000);
                console.log("error: ", err);
            });
    }

    resetError(event) {
        event.preventDefault();
        this.setState({
            error: false,
            noMatch: false,
            shortPW: false,
        });
    }

    setError1(event) {
        event.preventDefault();
        this.setState({
            error1: true,
            error2: false,
            error3: false,
            error4: false,
        });
    }

    setError2(event) {
        event.preventDefault();
        this.setState({
            error2: true,
            error1: false,
            error3: false,
            error4: false,
        });
    }

    setError3(event) {
        event.preventDefault();
        this.setState({
            error3: true,
            error2: false,
            error1: false,
            error4: false,
        });
    }

    setError4(event) {
        event.preventDefault();
        this.setState({
            error4: true,
            error2: false,
            error3: false,
            error1: false,
        });
    }

    setVinylModal(event) {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        this.setState({
            vinylSlider: "visible",
            overlay: "overlay",
        });
    }

    setTapeModal(event) {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        this.setState({
            tapeModal: "visible",
            overlay: "overlay",
        });
    }

    setTshirtModal(event) {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        this.setState({
            tshirtModal: "visible",
            overlay: "overlay",
        });
    }

    setLongsleeveModal(event) {
        event.preventDefault();
        document.body.style.overflow = "hidden";
        this.setState({
            longsleeveModal: "visible",
            overlay: "overlay",
        });
    }

    closeModal(event) {
        event.preventDefault();
        document.body.style.overflow = "scroll";
        this.setState({
            vinylSlider: "hidden",
            tapeModal: "hidden",
            tshirtModal: "hidden",
            longsleeveModal: "hidden",
            overlay: "",
        });
    }

    render() {
        return (
            <div className="shop-general">
                <div
                    className={this.state.overlay}
                    onClick={this.closeModal}
                ></div>
                <div className="products">
                    <div className="row">
                        <div className="item-wrapper">
                            <div className="merch-card">
                                <img
                                    src="tshirt.jpg"
                                    className="item-img"
                                    onClick={this.setTshirtModal}
                                />

                                <form>
                                    <select name="size">
                                        <option value="-">
                                            Choose a size:
                                        </option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                    <button
                                        onClick={this.setError1}
                                        className="addtocart"
                                    >
                                        Add to cart
                                    </button>
                                </form>
                            </div>
                            <div className="description">
                                <p className="item-name">"Harvester Of Hate"</p>
                                <p className="item-name">T-Shirt</p>
                                <p className="item-name">Price: 10€</p>
                                {this.state.error1 && (
                                    <p className="error">
                                        You need to be registered in order to
                                        buy something
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="item-wrapper">
                            <div className="merch-card">
                                <img
                                    src="longsleeve.jpg"
                                    className="item-img"
                                    onClick={this.setLongsleeveModal}
                                />
                                <form>
                                    <select name="size">
                                        <option value="-">
                                            Choose a size:
                                        </option>
                                        <option value="S">S</option>
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                    </select>
                                    <button
                                        onClick={this.setError2}
                                        className="addtocart"
                                    >
                                        Add to cart
                                    </button>
                                </form>
                            </div>
                            <div className="description">
                                <p className="item-name">"Dehumanized"</p>
                                <p className="item-name">Longsleeve</p>
                                <p className="item-name">Price: 15€</p>
                                {this.state.error2 && (
                                    <p className="error">
                                        You need to be registered in order to
                                        buy something
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="item-wrapper">
                            <div className="merch-card">
                                <img
                                    src="vinyl-red.jpg"
                                    className="item-img"
                                    onClick={this.setVinylModal}
                                />
                                <form>
                                    <select name="color">
                                        <option value="-">
                                            Choose a color:
                                        </option>
                                        <option value="Clear Red">RED</option>
                                        <option value="Clear Green">
                                            GREEN
                                        </option>
                                        <option value="Blue">BLUE</option>
                                        <option value="Light Blue">
                                            LIGHT BLUE
                                        </option>
                                    </select>
                                    <button
                                        onClick={this.setError3}
                                        className="addtocart"
                                    >
                                        Add to cart
                                    </button>
                                </form>
                            </div>
                            <div className="description">
                                <p className="item-name">Days Of Madness</p>
                                <p className="item-name">LP 12"</p>
                                <p className="item-name">Price: 12€</p>
                                {this.state.error3 && (
                                    <p className="error">
                                        You need to be registered in order to
                                        buy something
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="item-wrapper">
                            <div className="merch-card">
                                <img
                                    src="tape2.jpg"
                                    className="item-img"
                                    onClick={this.setTapeModal}
                                />
                                <form>
                                    <select>
                                        <option value="-">--</option>
                                    </select>
                                    <button
                                        onClick={this.setError4}
                                        className="addtocart"
                                    >
                                        Add to cart
                                    </button>
                                </form>
                            </div>
                            <div className="description">
                                <p className="item-name">Split w/ Moratory</p>
                                <p className="item-name">Tape</p>
                                <p className="sold-out">Sold Out</p>
                                {this.state.error4 && (
                                    <p className="error">
                                        You need to be registered in order to
                                        buy something
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="registration">
                    <h2 className="reg-title">REGISTER HERE:</h2>
                    <form onSubmit={this.handleSubmit} className="reg-form">
                        <input
                            type="text"
                            name="firstname"
                            placeholder="First Name"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Last Name"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="Street Name and Number"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="zip"
                            placeholder="ZIP"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="password"
                            name="password1"
                            placeholder="Password"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <input
                            type="password"
                            name="password2"
                            placeholder="Confirm Password"
                            required
                            onChange={this.handleChange}
                            onFocus={this.resetError}
                        />
                        <button className="reg-btn">Register</button>
                        <p className="already">
                            Already a member?{" "}
                            <a
                                className="login-link"
                                onClick={this.props.setLogin}
                            >
                                Log in
                            </a>
                        </p>
                        {this.state.error && (
                            <p className="reg-error">Email already in use</p>
                        )}
                        {this.state.noMatch && (
                            <p className="reg-error">Passwords don't match</p>
                        )}
                    </form>
                </div>
                {this.state.vinylSlider == "visible" && <VinylSlider />}
                {this.state.tapeModal == "visible" && (
                    <div className="tape-modal">
                        <a id="x-modal" onClick={this.closeModal}>
                            X
                        </a>
                        <img src="/tape.jpg" className="tapephoto" />
                    </div>
                )}
                {this.state.tshirtModal == "visible" && (
                    <div className="tshirt-modal">
                        <a id="x-modal" onClick={this.closeModal}>
                            X
                        </a>
                        <img src="/tshirt.jpg" className="tshirtphoto" />
                    </div>
                )}
                {this.state.longsleeveModal == "visible" && (
                    <div className="longsleeve-modal">
                        <a id="x-modal" onClick={this.closeModal}>
                            X
                        </a>
                        <img
                            src="/longsleeve.jpg"
                            className="longsleevephoto"
                        />
                    </div>
                )}
            </div>
        );
    }
}
