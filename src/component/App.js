import React from "react";
import Carousel from "./carousel";

export default function App() {

    return (
        <div className={'app_container'}>
            <Carousel slides={
                [
                    <button>SLIDE #1</button>,
                    "slide 2",
                    <img src="https://steamuserimages-a.akamaihd.net/ugc/865111917380159024/6FBBE48A6CA7CAD010DF38D09C56F22333C114F2/" alt="image" />,
                    44,
                    "slide 5",
                ]
            }/>
        </div>
    );
}

