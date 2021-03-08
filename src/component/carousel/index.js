import React, {useState,useRef,useEffect } from "react";
import Slide from "./slide";

function classSelect(className, isLeft) {
    if (className === "slide") {
        if (isLeft) {
            return "slide move-left-1";
        } else {
            return "slide move-right-1";
        }
    } else {
        if (isLeft) {
            if (className === "slide move-left-1") {
                return "slide move-left-2";
            } else {
                return "slide move-left-1";
            }
        } else {
            if (className === "slide move-right-1") {
                return "slide move-right-2";
            } else {
                return "slide move-right-1";
            }
        }
    }
}

function positionExtract(pos, len) {
    if (pos < 0) {
        return len - 1;
    }
    if (pos >= len) {
        return 0;
    }
    return pos;
}

function arraySizeError(arr) {
    return arr.length >= 2;
}

export default function Carousel(props) {

    const leftStick = '<';
    const rightStick = '>';
    const sliderLength = props.slides.length;

    if (arraySizeError(sliderLength)) {
        return alert("Array size too small to implement slider");
    }

    const [slides, slidesSelect] = useState({
        currentMiddle: 0,
        classForL: 'slide',
        classForM: 'slide',
        classForR: 'slide',
    });

    function middlePointReforge(isItLeft) {
        let middlePoint = slides.currentMiddle
        if (isItLeft) {
            if (middlePoint === 0) {
                middlePoint = sliderLength - 1;
            } else {
                middlePoint = middlePoint - 1;
            }
        } else {
            if (middlePoint === sliderLength - 1) {
                middlePoint = 0;
            } else {
                middlePoint += 1;
            }
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


    let touchStart = 0;
    let touchEnd = 0;

    const middleSlideRef = useRef(null);


    const executeScroll = () => {
        console.log("worked");
        middleSlideRef.current.scrollIntoView({behavior: 'smooth' });
    }

    useEffect
    (() => {
        middleSlideRef.current.scrollIntoView();
    }, []);

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
                    if(Math.abs(touchStart-touchEnd)>=40) {
                        middlePointReforge(touchStart <= touchEnd);
                    }
                    executeScroll();
                }}
                className={'slide-screen'}
            >

                <Slide
                    classes={slides.classForL}>
                    {props.slides[positionExtract(slides.currentMiddle - 1, sliderLength)]}
                </Slide>
                <div className={slides.classForM}
                     onAnimationEnd={executeScroll}
                     ref={middleSlideRef}>
                <Slide>{props.slides[slides.currentMiddle]}</Slide>
                </div>
                <Slide
                    classes={slides.classForR}>
                    {props.slides[positionExtract(slides.currentMiddle + 1, sliderLength)]}
                </Slide>

            </div>
            <button className={'slider-button button-right'}
                    onClick={() => middlePointReforge(false)}>{rightStick}</button>
        </div>
    );
}
