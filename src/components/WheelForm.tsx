import React, { useState, useEffect } from 'react';



interface WheelFormProps {
    callback: (values: string[]) => void;
    }

//todO: make this dynamic
const initalValues = {
    f1: '',
    f2: '',
    f3: '',
    f4: '',
    f5: '',
    f6: ''
}

const WheelForm: React.FC = (props) => {
    const updateValues = props.callback;
    const [values, setValues] = useState<Object>(initalValues);

    useEffect(() => {
        let _values: string[] = (Object.values(values) as string[]).filter((v) => v !== '');
        updateValues(_values)

    }, [values]);




    const handleChange = (e: Event) => {
        setValues({...values, [e.target.id]: e.target.value})
    }

    return (<div>
        <h2>WHEEL INPUT FORM GOES HERE</h2>
        <form>
        <input id="f1" type="text" onChange={(e) => handleChange(e)} />
        <input id="f2" type="text" onChange={(e) => handleChange(e)} />
        <input id="f3" type="text" onChange={(e) => handleChange(e)} />
        <input id="f4" type="text" onChange={(e) => handleChange(e)} />
        <input id="f5" type="text" onChange={(e) => handleChange(e)} />
        <input id="f6" type="text" onChange={(e) => handleChange(e)} />
        </form>
    </div>)
}

export default WheelForm;
