import React, { useEffect, useState } from "react";

const SVG_NS = "http://www.w3.org/2000/svg";

interface Vec2 {
    x: number;
    y: number;
} 


function getCirclePoint(middle: Vec2, radius: number, alpha: number) {
    /*
    calculate the x,y coordinates of a point on a circle
    given the circle's middle point, radius, and angle
    Note: this only works for SVG
    because in SVG 0 degress points to the right
    while in trigonometry 0 degrees points upward
    */
    const radians = (alpha - 90) * Math.PI / 180;
    const result: Vec2 = {
        x: middle.x + radius * Math.cos(radians),
        y: middle.y + radius * Math.sin(radians)
        };
    return result;
}




interface WheelProps {
    }


interface SliceProps {
    value: string;
    offsetAngle: number;
    radius: number;
    middle: Vec2;
    color: string;
    sliceAngle: number;
    }


const WheelSlice: React.FC<SliceProps> = (props) => {
    const middle = props.middle;
    const radius = props.radius;
    const alpha = props.offsetAngle;
    const beta = alpha + props.sliceAngle;
    const p1 = getCirclePoint(middle, radius, alpha);
    const p2 = getCirclePoint(middle, radius, beta);
    const largeArcFlag = props.sliceAngle <= 180 ? '0' : '1';
    const d = `
            M ${middle.x} ${middle.y}
            L ${p1.x} ${p1.y}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${p2.x}, ${p2.y}
            Z`;

    // calculate the position of the text
    const angleBetweenPoints = 0.5 * (alpha + beta);
    const textAnchorPoint = getCirclePoint(middle, 0.5 * radius, angleBetweenPoints); // maybe use radius * 0.8
    const transformation = `rotate(${-90 + angleBetweenPoints} ${textAnchorPoint.x} ${textAnchorPoint.y})`;
    
    return (
        <>
            <path d={d} fill={props.color} stroke='black' strokeWidth="2">

            </path>
            <text
                x={textAnchorPoint.x}
                y={textAnchorPoint.y}
                fill='white'
                transform={transformation}
                >

                {props.value}

            </text> 
        </>)
}


const Wheel: React.FC<WheelProps> = () => {
    const radius = 200;
    const m: Vec2 = {x: radius, y: radius}
    const parentIdent = 'wheel';
    const initalValues = ['alfred', 'batman', 'clown', 'dota2', 'elephant', 'freddy', 'google', 'help'];
    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'orange', 'brown'];
    const [values, setValues] = useState<string[]>(initalValues);


    return (
    <div>
        <h1>Spin the Wheel</h1>
        <svg id={parentIdent} width={radius * 3} height={radius * 3}>
            { values.map((value, i) => {
                const sliceAngle = 360 / values.length;
                const alpha = sliceAngle * i
                return <WheelSlice key={i} value={value} offsetAngle={alpha} sliceAngle={sliceAngle} radius={radius} middle={m} color={colors[i]} />
            })
        }
        </svg>
    </div>
    );
}


export default Wheel;
