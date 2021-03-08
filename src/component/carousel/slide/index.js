import React from "react";

export default function Slide(props) {
    let classes = props.classes;
    return (
        <div  className={classes}>
            {props.children}
        </div>
    );
}
