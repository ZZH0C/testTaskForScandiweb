import React from "react";

export default     function Slide(props) {
    let elem = props.elem;
    let classes = props.classes;
    return (
        <div  className={classes}>
            {elem}
        </div>
    );
}
