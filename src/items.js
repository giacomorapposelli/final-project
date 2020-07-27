import React, { useEffect, useState } from "react";
import axios from "./axios";
import VinylSlider from "./vinylslider";

export default function Items() {
    const [size, setSize] = useState("");
    const [color, setColor] = useState("");
    const [order, setOrder] = useState([]);
    const [modal, setModal] = useState("hidden");
    const [vinylSlider, setVinylSlider] = useState("hidden");
    const [tapeModal, setTapeModal] = useState("hidden");
    const [longsleeveModal, setLongsleeveModal] = useState("hidden");
    const [tshirtModal, setTshirtModal] = useState("hidden");
    const [total, setTotal] = useState();
    const [className, setClassName] = useState();
    const [soldOut, setSoldOut] = useState("");
    const [error, setError] = useState("");
    const [code, setCode] = useState("");
    const [currentCart, setCurrentCart] = useState([]);

    let sum = 0;
    let tempSum = 0;

    currentCart.map((each) => {
        tempSum += each.price;
    });

    const addTshirt = (event) => {
        event.preventDefault();
        axios
            .post("/addthsirt", { size })
            .then((response) => {
                console.log("DATA", response.data);
                setCurrentCart([...currentCart, response.data]);
                console.log("CURR:", currentCart);
            })
            .catch((err) => {
                console.log("TSHIRT NOT ADDED: ", err);
                setError(true);
            });
    };

    const addLongsleeve = (event) => {
        event.preventDefault();
        axios
            .post("/addlongsleeve", { size })
            .then((response) => {
                setCurrentCart([...currentCart, response.data]);
            })
            .catch((err) => {
                console.log("TSHIRT NOT ADDED: ", err);
                setTimeout(function () {
                    setError("Choose a size!");
                }, 3000);
            });
    };

    const addVinyl = (event) => {
        event.preventDefault();
        axios
            .post("/addvinyl", { color })
            .then((response) => {
                setCurrentCart([...currentCart, response.data]);
            })
            .catch((err) => {
                console.log("VINYL NOT ADDED: ", err);
                setTimeout(function () {
                    setError("Choose a color!");
                }, 3000);
            });
    };

    const submitOrder = (event) => {
        event.preventDefault();
        axios
            .get("/order")
            .then((response) => {
                setOrder(response.data);
                setModal("visible");
                setClassName("overlay");
                setCurrentCart([]);
            })
            .catch((err) => {
                console.log("ERROR IN ORDER: ", err);
            });
    };

    const closeModal = (event) => {
        event.preventDefault();
        setModal("hidden");
        setVinylSlider("hidden");
        setTapeModal("hidden");
        setTshirtModal("hidden");
        setLongsleeveModal("hidden");
        setClassName("");
    };

    const soldOutError = (event) => {
        event.preventDefault();
        setSoldOut("This item is sold out");
        setTimeout(function () {
            setSoldOut("");
        }, 3000);
    };

    const setVinylModal = (event) => {
        event.preventDefault();
        setVinylSlider("visible");
        setClassName("overlay");
    };

    const openTapeModal = (event) => {
        event.preventDefault();
        setTapeModal("visible");
        setClassName("overlay");
    };

    const openTshirtModal = (event) => {
        event.preventDefault();
        setTshirtModal("visible");
        setClassName("overlay");
    };

    const openLongsleeveModal = (event) => {
        event.preventDefault();
        setLongsleeveModal("visible");
        setClassName("overlay");
    };

    const removeitem = (event) => {
        console.log(event.target);
        const itemId = event.target.parentElement.id;
        const items = currentCart.filter((each) => each.id != itemId);
        console.log(itemId);
        setCurrentCart(items);
        axios.post("/removeitem", { itemId });
    };

    useEffect(() => {
        axios
            .get("/code")
            .then((response) => {
                console.log("RANDOM CODE: ", response);
                setCode(response.data.orderCode);
            })
            .catch((err) => console.log(err));

        order.map((each) => {
            sum += each.price;
        });

        setTotal(sum);
    }, [order]);
    return (
        <div className="shop-general">
            <div className={className} onClick={closeModal} id="shop"></div>
            <div className="row">
                <div className="merch-card">
                    <img
                        src="tshirt.jpg"
                        className="item-img"
                        onClick={openTshirtModal}
                    />

                    <form>
                        <select
                            name="size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option value="">Size</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <button onClick={addTshirt}>Add to cart</button>
                    </form>
                </div>
                <div className="description">
                    <p className="item-name">"Harvester Of Hate"</p>
                    <p className="item-name">T-Shirt</p>
                    <p className="item-name">Price 10€</p>
                    {<p className="error">{error}</p>}
                </div>

                <div className="merch-card">
                    <img
                        src="longsleeve.jpg"
                        className="item-img"
                        onClick={openLongsleeveModal}
                    />
                    <form>
                        <select
                            name="size"
                            onChange={(event) => setSize(event.target.value)}
                        >
                            <option value="">Size</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        <button onClick={addLongsleeve}>Add to cart</button>
                    </form>
                </div>
                <div className="description">
                    <p className="item-name">"Dehumanized"</p>
                    <p className="item-name">Longsleeve</p>
                    <p className="item-name">Price 15€</p>
                    <p className="error">{error}</p>
                </div>
            </div>
            <div className="row">
                <div className="merch-card">
                    <img
                        src="vinyl-red.jpg"
                        className="item-img"
                        onClick={setVinylModal}
                    />
                    <form>
                        <select
                            name="color"
                            onChange={(event) => setColor(event.target.value)}
                        >
                            <option value="">Color</option>
                            <option value="Red">RED</option>
                            <option value="Green">GREEN</option>
                            <option value="Blue">BLUE</option>
                            <option value="Light Blue">LIGHT BLUE</option>
                        </select>
                        <button onClick={addVinyl}>Add to cart</button>
                    </form>
                </div>
                <div className="description">
                    <p className="item-name">Days Of Madness</p>
                    <p className="item-name">LP 12"</p>
                    <p className="item-name">Price 12€</p>
                    <p className="error">{error}</p>
                </div>

                <div className="merch-card">
                    <img
                        src="tape.jpg"
                        className="item-img"
                        onClick={openTapeModal}
                    />
                    <form>
                        <select>
                            <option value="-">--</option>
                        </select>
                        <button onClick={soldOutError}>Add to cart</button>
                    </form>
                </div>
                <div className="description">
                    <p className="item-name">Split w/ Moratory</p>
                    <p className="item-name">Tape</p>
                    <p className="sold-out">Sold Out</p>
                    {soldOut && <p className="error">{soldOut}</p>}
                </div>
            </div>
            <div className="cart">
                <h2 className="cart-title">YOUR CART:</h2>
                {!currentCart.length && (
                    <div className="empty-cart">
                        <h2 className="sold-out ">Your Cart is now empty </h2>
                        <img
                            src="/icons/empty-cart.png"
                            alt=""
                            className="empty-icon"
                        />
                    </div>
                )}
                ||
                <div className="cart-container">
                    {currentCart &&
                        currentCart.length > 0 &&
                        currentCart.map((each) => {
                            console.log("EACH: ", each);
                            return (
                                <div
                                    key={each.id}
                                    className="item-container"
                                    id={each.id}
                                >
                                    <img
                                        src={each.imgurl}
                                        className="small-pic"
                                    />
                                    <p className="item-name">
                                        {each.tshirt || each.vinyl}
                                    </p>
                                    <p className="success">
                                        {each.size
                                            ? "Size: " + each.size
                                            : "Color: " + each.color}
                                    </p>
                                    <p className="success">
                                        Price: {each.price}€
                                    </p>
                                    <img
                                        src="/icons/delete.png"
                                        className="social-logo"
                                        onClick={removeitem}
                                    />
                                </div>
                            );
                        })}
                </div>
                {currentCart.length > 0 && (
                    <p className="success">Total: {tempSum}€</p>
                )}
                {currentCart.length > 0 && (
                    <button onClick={submitOrder} id="submit-btn">
                        Submit Order
                    </button>
                )}
            </div>

            {modal == "visible" && (
                <div className="thankyou-modal">
                    <a id="x-modal" onClick={closeModal}>
                        X
                    </a>
                    <div className="modal-container">
                        <h1 className="thanks">THANK YOU!</h1>
                        <h3 className="thanks">
                            We've just received your order,you'll be contacted
                            in a few days about shipment and payment methods
                        </h3>
                        <div className="order-container">
                            <h2 className="success">Order Code: {code}</h2>
                            {order.map((each) => (
                                <div
                                    key={each.order_id}
                                    className="item-container"
                                >
                                    <img
                                        src={each.imgurl}
                                        className="small-pic"
                                    />
                                    <p className="success">
                                        {each.vinyl || each.tshirt}
                                    </p>

                                    <p className="success">
                                        {each.size
                                            ? "Size: " + each.size
                                            : "Color: " + each.color}
                                    </p>
                                    <p className="success">
                                        Price: {each.price}€
                                    </p>
                                </div>
                            ))}
                            <p className="success total">Total: {total}€</p>
                            <p className="address">
                                {order[0].first} {order[0].last}
                            </p>
                            <p className="address">{order[0].address}</p>
                            <p className="address">
                                {order[0].zip},{order[0].city}
                            </p>
                            <p className="address">{order[0].country}</p>
                        </div>
                    </div>
                </div>
            )}
            {vinylSlider == "visible" && <VinylSlider />}
            {tapeModal == "visible" && (
                <div className="tape-modal">
                    <img src="/tape.jpg" className="tapephoto" />
                </div>
            )}
            {tshirtModal == "visible" && (
                <div className="tshirt-modal">
                    <img src="/tshirt.jpg" className="tshirtphoto" />
                </div>
            )}
            {longsleeveModal == "visible" && (
                <div className="longsleeve-modal">
                    <img src="/longsleeve.jpg" className="longsleevephoto" />
                </div>
            )}
        </div>
    );
}
