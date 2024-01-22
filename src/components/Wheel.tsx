import React, { useEffect, useState } from "react";


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
    // if props.sliceangle is 360, then the slice is a full circle. To draw a circle we need to make beta smaller than 360°
    const alpha = props.offsetAngle;
    const beta = props.sliceAngle !== 360 ? alpha + props.sliceAngle : 359.99;
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

interface WheelProps {
    values?: string[];
}


const Wheel: React.FC<WheelProps> = (props) => {
    const radius = 200;
    const m: Vec2 = {x: radius, y: radius}
    const wheelIdent = 'wheel';
    

    const values = props.values;
    const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'orange', 'brown'];
    const [finished, setFinished] = useState<boolean>(false);
    const [offset, setOffset] = useState<number>(0);
    const [lastResult, setLastResult] = useState<string>('');


    function handleReset(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
        e.preventDefault();
        setFinished(false);
        setOffset(0);
        let wheel = document.getElementById(wheelIdent);
        wheel?.classList.remove('wheel__spinning');
        wheel?.classList.add('wheel__not_spinning');
        wheel!.style.transform = `rotate(0deg)`;
    }


    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        // spin the wheel
        let wheel = document.getElementById(wheelIdent);
        if (wheel === null) {
        return;}

        const spinAmount = Math.random() * 100;
        const spinDegree = 360 + spinAmount * Math.floor(Math.random() * 360);
        const _offset = spinDegree < 360  ? spinDegree : spinDegree % 360;

        // set the offset
        wheel?.style.setProperty('--spin-degree', `${spinDegree}deg`);
        wheel?.classList.remove('wheel__not_spinning');
        wheel?.classList.add('wheel__spinning');

        setTimeout(() => {
            wheel!.style.transform = `rotate(${_offset}deg)`
            setOffset(_offset);
            setFinished(true);
        }, 1985)
        
    }


    function getSliceAngle() {
        if (values === undefined || !values.length) {return 1}
        return 360 / values.length;
    }

    useEffect(() => {
        if (!finished){
            return
        }
        if (values === undefined || !values.length) {return}
        let r = getSliceAngle();
        const resultIndex = values!.length - Math.floor(offset/r) - 1;
        setLastResult(values[resultIndex]);
    }, [finished])

    return (
    <div id="wheel__wrapper">
        <h1>Spin the Wheel</h1>
        <div id={wheelIdent} style={{width: radius*2, height: radius*2}}>
        <svg id="wheel_svg" width={radius * 2} height={radius * 2}>
            { values?.map((value, i) => {
                let sliceAngle = getSliceAngle();
                const alpha = sliceAngle * i;
                return <WheelSlice key={i} value={value} offsetAngle={alpha} sliceAngle={sliceAngle} radius={radius} middle={m} color={colors[i]} />
            })
        }
        </svg>
        </div>
         { finished ?
         <button onClick={(e) => handleReset(e)}> RESET </button>
         : <button onClick={(e) => handleClick(e)}> SPIN </button>  } 
        { lastResult.length > 0 ? <ShowResult result={lastResult} /> : <></> } 
    </div>
    );
}

interface ResultProps {
    result: string
}

const ShowResult: React.FC<ResultProps> = (props) => { 
    return (
       <h3>Last Result: { props.result } </h3>
    )

}

export default Wheel;
