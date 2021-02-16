import React from "react";
import Carousel from "./carousel";

export default function App() {

    return (
        <div className={'main-container'}>
            <Carousel slides={["slide 1","slide 2","slide 3","slide 4","slide 5"]}/>
        </div>
    );
}

