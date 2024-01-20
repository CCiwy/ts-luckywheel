
const WheelInputForm: React.FC = () => {
    const handleAction = (e: Event) => {
        e.preventDefault();
        console.log("handleAction");
    }

    const handleAddField = (e: Event) => {
        e.preventDefault();
        console.log("handleAddField");
        }
    
    const handleDelField = (e: Event) => {
    e.preventDefault();
    console.log("handleDel");
        }


    const handleChange = (e: Event) => {
    console.log(e.target.value)
        }

    return (<div>
        <h2>WHEEL INPUT FORM GOES HERE</h2>
        <form>
        <button onClick={(e) =>handleDelField(e)}> REMOVE FIELD</button>
        <input type="text" onChange={(e) => handleChange(e)} />
        <button onClick={(e) =>handleAddField(e)}> NEW FIELD</button>
        <button onClick={(e) =>handleAction(e)}> CLICK ME</button>
        </form>
    </div>)
}
