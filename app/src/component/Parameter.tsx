import CheckBox from "./CheckBox";
import Dropdown from "./Dropdown";
import TextField from "./TextField";

function Parameter() {
    return (
        <fieldset>
            <legend>Parameter</legend>
            <Dropdown name={"In"} options={["path", "query"]} />
            <Dropdown name="Type" options={["Array", "Boolean", "Number", "Object", "String" ]}/>
            <CheckBox name="Required"/>
            <TextField name="Description"/>
            <TextField name="Example"/>
            <button>Delete Parameter</button>
        </fieldset>
    )
}

export default Parameter;