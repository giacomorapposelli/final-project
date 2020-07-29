import React, { useState } from "react";
import Tour from "./tour";
import Home from "./home";
import Gallery from "./gallery";
import Store from "./store";

export default function App() {
    return (
        <div className="container">
            <header>
                <p>
                    <a href="#home" className="head-links">
                        HOME
                    </a>
                </p>
                <p>
                    <a href="#tour" className="head-links">
                        TOUR
                    </a>
                </p>
                <p>
                    <a href="#gallery" className="head-links">
                        GALLERY
                    </a>
                </p>
                <p>
                    <a href="#store" className="head-links">
                        STORE
                    </a>
                </p>
            </header>
            <Home />
            <Tour />
            <Gallery />
            <Store />
            <footer>
                <p className="copyright">
                    © 2020 Speedköbra - All rights reserved
                </p>
                <div className="logos">
                    <a
                        href="https://www.instagram.com/speedkobra/"
                        target="_blank"
                    >
                        <img src="/insta.png" alt="" className="social-logo" />
                    </a>
                    <a
                        href="https://www.facebook.com/speedkobra666"
                        target="_blank"
                    >
                        <img src="/fb.png" alt="" className="social-logo" />
                    </a>
                    <a
                        href="https://www.youtube.com/channel/UC57goUK4nTrwOGdhchCw8TA"
                        target="_blank"
                    >
                        <img src="/you.png" alt="" className="social-logo" />
                    </a>
                    <a
                        href="https://open.spotify.com/artist/6bwLhL6tsar6mpLQTvnxr9"
                        target="_blank"
                    >
                        <img
                            src="/spotify.png"
                            alt=""
                            className="social-logo bc"
                        />
                    </a>
                </div>
            </footer>
        </div>
    );
}
