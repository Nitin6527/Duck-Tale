import React, { useState } from 'react';
import "./button.css";

const Button = ({ title, iconDown, bropdown, iconUp, toggle, handleStudent, deleteItem, index }) => {
    const [show, setShow] = useState(false);
    const [filterBy, setFilterBy] = useState("");

    const handleToggle = () => {
        setShow(show => !show)
    }

    const handleFilter = (item) => {
        setFilterBy(item)
    }

    return (
        <div className="button" onClick={() => handleToggle()}>
            <button className="common_button" onClick={toggle, handleStudent} >{filterBy ? filterBy : title} {show ? iconUp : iconDown}</button>
            {show && bropdown && (
                <div class="dropdown">
                    <a onClick={() => handleFilter("class")}>Class</a>
                    <a onClick={() => handleFilter("subject")}> Subject</a>
                </div>)
            }
        </div >
    )
}

export default Button
