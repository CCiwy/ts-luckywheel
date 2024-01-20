import React, { useState } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";

interface Vec2 {
    x: number;
    y: number;
} 


function getCirclePoint(middle: Vec2, radius: number: alpha: number) {
    /*
    calculate the x,y coordinates of a point on a circle
    given the circle's middle point, radius, and angle
    Note: this only works for SVG
    because in SVG 0 degress points to the right
    while in trigonometry 0 degrees points upward
    */
    const radians = alpha * Math.PI / 180;
    const result: Vec2 = {
        x: middle.x + radius * Math.cos(radians),
        y: middle.y - radius * Math.sin(radians)
        };
    return result;
}


interface WheelProps {
    }


const Wheel: React.FC<WheelProps> = () => {
    return (
    <div>
        <h1>Spin the Wheel</h1>
    

    </div>
        );
}


export default Wheel;
