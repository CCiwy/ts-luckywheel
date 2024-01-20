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


    function createSliceText(m: Vec2, radius: number, value: string, angle: number) {
        const p = getCirclePoint(m, radius, angle); // maybe use radius * 0.8
        const textElem = document.createElementNS(SVG_NS, 'text');
        textElem.textContent = value;
        textElem.setAttribute('x', p.x.toString());
        textElem.setAttribute('y', p.y.toString());
        textElem.setAttribute('transform', `rotate(${-90 + angle} ${p.x} ${p.y})`);
        textElem.setAttribute('fill', 'white');
        return textElem;
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
    const  largeArcFlag = props.sliceAngle <= 180 ? '0' : '1';

    const d = `
            M ${middle.x} ${middle.y}
            L ${p1.x} ${p1.y}
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${p2.x}, ${p2.y}
            Z`;

            //slice.setAttributeNS(null, 'stroke', 'black');
            //slice.setAttributeNS(null, 'stroke-width', '2');
            //slice.setAttributeNS(null, 'transform', `rotate(${-90 + alpha} ${m.x} ${m.y})`);
            //parent?.appendChild(slice);
            //const angleBetween = alpha + 0.5 * sliceAngle;
            //const textElem = createSliceText(value, angleBetween);
            //parent?.appendChild(slice); 
            //parent?.appendChild(textElem); 
    return (<path d={d} fill={props.color} stroke='black'></path>)
}


const Wheel: React.FC<WheelProps> = () => {
    const radius = 200;
    const m: Vec2 = {x: radius, y: radius}
    const parentIdent = 'wheel';
    const initalValues = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'orange', 'brown'];
    const [values, setValues] = useState<string[]>(initalValues);


    return (
    <div>
        <h1>Spin the Wheel</h1>
        <svg id={parentIdent} width={radius * 2} height={radius * 2}>
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
