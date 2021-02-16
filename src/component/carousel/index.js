import React, {useState} from "react";
import Slide from "./slide";

export default function Carousel(props) {

    const leftStick = '<'
    const rightStick = '>'

    let slidesArray = [];
    props.slides.forEach((element) => {
        slidesArray.push(element);
    });

    const sliderLength = slidesArray.length;

    if (!arraySizeError(slidesArray)) {
        return alert("Array size too small to implement slider");
    }

    function middlePointReforge(isItLeft) {
        let middlePoint = slides.currentMiddle
        if (isItLeft) {
            if (middlePoint === 0){
                middlePoint = sliderLength - 1
            }
            else middlePoint = middlePoint - 1
        } else {
            if (middlePoint === sliderLength - 1) {
                middlePoint = 0
            }
            else middlePoint += 1
        }
        slidesSelect(
            {
                currentMiddle: middlePoint,

                classForL: classSelect(slides.classForM, isItLeft),
                classForM: classSelect(slides.classForM, isItLeft),
                classForR: classSelect(slides.classForM, isItLeft),
            }
        )
    }

    const [slides, slidesSelect] = useState({
        currentMiddle: 0,
        classForL: 'slide',
        classForM: 'slide',
        classForR: 'slide',
    });

    const elementL = <Slide elem={slidesArray[positionExtract(slides.currentMiddle - 1, sliderLength)]}
                            classes={slides.classForL}/>;
    const elementM = <Slide elem={slidesArray[slides.currentMiddle]}
                            classes={slides.classForM}/>;
    const elementR = <Slide elem={slidesArray[positionExtract(slides.currentMiddle + 1, sliderLength)]}
                            classes={slides.classForR}/>;

    let touchStart = 0;
    let touchEnd = 0;


    return (
        <div className={'slider-container'}>
            <button className={'slider-button button-left'}
                    onClick={() => middlePointReforge(true)}>{leftStick}</button>
            <div
                onTouchStart={(event) => {
                    touchStart = (event.changedTouches[0].screenX);
                }}
                onTouchEnd={(event) => {
                    touchEnd = (event.changedTouches[0].screenX);
                    middlePointReforge(touchStart <= touchEnd);
                }}
                className={'slide-screen'}
            >
                {elementL}
                {elementM}
                {elementR}
            </div>
            <button className={'slider-button button-right'}
                    onClick={() => middlePointReforge(false)}>{rightStick}</button>
        </div>
    );
}

function classSelect(className, isLeft) {
    if (className === "slide") {
        if (isLeft) {
            return "slide move-left-1"
        } else
            return "slide move-right-1"
    } else {
        if (isLeft) {
            if (className === "slide move-left-1")
                return "slide move-left-2"
            else return "slide move-left-1"
        } else {
            if (className === "slide move-right-1")
                return "slide move-right-2"
            else return "slide move-right-1"
        }
    }
}

function positionExtract(pos, len) {
    if (pos < 0) {
        return len - 1;
    }
    if (pos >= len) {
        return 0
    }
    return pos
}

function arraySizeError(arr) {
    return arr.length >= 2;
}
